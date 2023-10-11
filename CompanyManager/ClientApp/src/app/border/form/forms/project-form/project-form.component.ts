import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormService } from '../../../../services/form.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../services/toast.service';
import { Observable } from 'rxjs/internal/Observable';
import { ProjectRestService } from '../../../../api/services/project-rest.service';
import { UserDTO } from '../../../../api/models/user-dtos/user.dto';
import { UserRestService } from '../../../../api/services/user-rest.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { ProjectCreateDTO } from '../../../../api/models/project-dtos/project-create.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { of, switchMap } from 'rxjs';
import { ProjectEditDTO } from '../../../../api/models/project-dtos/project-edit.dto';
import { DatePipe } from '@angular/common';
import { ProjectAddFormGroup, ProjectEditFormGroup } from '../../../../models/forms/project-form-groups';
import { AppFormGroup } from '../../../../models/forms/app-form-group.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProjectFormComponent {
  private activityLog: string = "";
  isEditing: boolean = false;
  submitted = false;
  userList: UserDTO[] = [];

  createAt: Date = new Date();
  updateAt: Date = new Date();

  public form!: FormGroup;

  constructor(
    public formService: FormService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private projectRestService: ProjectRestService,
    private userRestService: UserRestService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.formService.getIsEditing.subscribe(result => {
      this.isEditing = result;
    })

    this.form = this.formBuilder.group({
      add: new ProjectAddFormGroup(),
      edit: new ProjectEditFormGroup()
    });

    this.loadData();
  }

  loadData() {
    this.userRestService.getAllUsers().subscribe({
      next: (res) => {
        this.userList = res.users;
        this.cdr.detectChanges();
      }
    });

    this.form.get('edit')?.patchValue({
      projectId: this.formService.getEditingProject?.id,
      title: this.formService.getEditingProject?.title,
      ownerId: this.formService.getEditingProject?.ownerID.toLowerCase()
    });

    this.createAt = this.formService.getEditingProject?.createAt || new Date();
    this.updateAt = this.formService.getEditingProject?.updateAt || new Date();
    this.cdr.detectChanges();
  }

  get addForm(): AppFormGroup {
    return (this.form.get('add') || null) as AppFormGroup;
  }

  get editForm(): AppFormGroup {
    return (this.form.get('edit') || null) as AppFormGroup;
  }

  get isFormValid() {
    if (this.isEditing && this.editForm.valid)
      return true;
    else if (!this.isEditing && this.addForm.valid)
      return true;
    else
      return false;
  }

  private editProject(userID: string) {
    var editProject: ProjectEditDTO = <ProjectEditDTO>{};

    const editForm = this.form.get('edit');
    editProject.projectID = editForm?.get('projectId')?.value;
    editProject.title = editForm?.get('title')?.value;
    editProject.ownerId = editForm?.get('ownerId')?.value;


    this.projectRestService.updateProject(userID, editProject.projectID, editProject).subscribe({
      next: (res) => {
        this.toastService.showToast('confirm', `Edytowano projekt: ${res.title}`);
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showToast('warning', `Błąd podczas edycji projektu!`);
      }
    })
  }
  private addProject(userID: string) {
    var addProject: ProjectCreateDTO = <ProjectCreateDTO>{};

    const addForm = this.form.get('add');
    addProject.title = addForm?.get('title')?.value;
    addProject.ownerId = addForm?.get('ownerId')?.value;

    this.projectRestService.createProject(userID, addProject).subscribe({
      next: (res) => {
        this.toastService.showToast('confirm', `Utworzono projekt: ${res.title}`);
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showToast('warning', `Błąd podczas tworzenia projektu!`);
      }
    })
  }


  onSubmit() {
    var userID = this.localStorageService.getUserID().getValue();

    if (this.editForm?.valid) 
      this.editProject(userID);
    
    if (this.addForm?.valid) 
      this.addProject(userID);
    

    if (this.addForm?.invalid && this.editForm?.invalid) {
      return;
    }

    this.form.reset();
    this.formService.onChangeFormVisibility();
  }

  close() {
    this.formService.onChangeFormVisibility();
  }
}
