import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormService } from '../../../../services/form.service';
import { FormBuilder, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProjectFormComponent {
  isEditing$!: Observable<boolean>;
  submitted = false;
  userList: UserDTO[] = [];
  ownerID: string = '';

  form = this.formBuilder.group({
    add: this.formBuilder.group({
      title: ['', [Validators.required]],
      ownerId: ['', [Validators.required]]
    }),
    edit: this.formBuilder.group({
      title: [this.formService.getEditingProject?.title, [Validators.required]],
      ownerId: ['', [Validators.required]]
    }),
  });

  constructor(
    public formService: FormService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private projectRestService: ProjectRestService,
    private userRestService: UserRestService,
    private cdr: ChangeDetectorRef
  ) { }

  get getAddControls() {
    return this.form.controls.add.controls;
  }

  get getEditControls() {
    return this.form.controls.edit.controls;
  }

  get getFormControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.isEditing$ = this.formService.getIsEditing;
    
    this.userRestService.getAllUsers().subscribe({
      next: (res) => {
        
        this.userList = res.users;
        this.ownerID = this.formService.getEditingProject?.ownerID.toUpperCase() || "";
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(formValues: any) {
    this.submitted = true;
    var userID = this.localStorageService.getUserID().getValue();
    var projectID = this.formService.getEditingProject?.id || '';

    if (this.getFormControls.edit.valid) {

      const formValue = { ...formValues };

      const model: ProjectEditDTO = {
        projectID: projectID,
        title: formValues.edit.title,
        ownerId: formValues.edit.ownerId
      };

      this.projectRestService.updateProject(userID, projectID, model).subscribe({

        next: (res) => {
          this.toastService.showToast('confirm', `Edytowano projekt: ${res.title}`);
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.showToast('warning', `Błąd podczas edycji projektu!`);
        }
      })
    }
    if (this.getFormControls.add.valid) {

      const formValue = { ...formValues };
      const model: ProjectCreateDTO = {
        title: formValues.add.title,
        ownerId: formValues.add.ownerId
      };

      this.projectRestService.createProject(userID, model).subscribe({
        next: (res) => {
          this.toastService.showToast('confirm', `Utworzono projekt: ${res.title}`);
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.showToast('warning', `Błąd podczas tworzenia projektu!`);
        }
      })
    }

    if (this.getFormControls.add.invalid && this.getFormControls.edit.invalid) {
      return;
    }

    this.form.reset();
    this.formService.onChangeFormVisibility();
  }

  close() {
    this.formService.onChangeFormVisibility();
  }
}
