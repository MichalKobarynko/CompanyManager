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

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProjectFormComponent {
  private activityLog: string = "";
  isEditing$!: Observable<boolean>;
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
    this.isEditing$ = this.formService.getIsEditing;

    this.form = this.formBuilder.group({
      add: new ProjectAddFormGroup(),
      edit: new ProjectEditFormGroup()
    });

    //this.form = this.formBuilder.group({
    //  add: this.formBuilder.group({
    //    title: ['', [Validators.required]],
    //    ownerId: ['', [Validators.required]]
    //  }),
    //  edit: this.formBuilder.group({
    //    projectId: ['', [Validators.required]],
    //    title:     ['', [Validators.required]],
    //    ownerId:   ['', [Validators.required]],
    //  }),
    //});
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

  get addForm() {
    return this.form.get('add') || null;
  }

  get editForm() {
    return this.form.get('edit') || null;
  }



  onSubmit() {
    this.submitted = true;
    var userID = this.localStorageService.getUserID().getValue();

    if (this.editForm?.valid) {
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

    if (this.addForm?.valid) {
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
