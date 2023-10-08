import { Component } from '@angular/core';
import { FormService } from '../../../../services/form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../../../services/toast.service';
import { Observable } from 'rxjs/internal/Observable';
import { ProjectRestService } from '../../../../api/services/project-rest.service';
import { UserDTO } from '../../../../api/models/user-dtos/user.dto';
import { UserRestService } from '../../../../api/services/user-rest.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { ProjectCreateDTO } from '../../../../api/models/project-dtos/project-create.dto';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
  isEditing$!: Observable<boolean>;
  submitted = false;
  userList: UserDTO[] = [];

  form = this.formBuilder.group({
    add: this.formBuilder.group({
      title: ['', [Validators.required]],
      ownerId: ['', [Validators.required]]
    }),
    edit: this.formBuilder.group({
      title: [this.formService.getEditingProject?.title, [Validators.required]],
    }),
  });

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private projectRestService: ProjectRestService,
    private userRestService: UserRestService
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
        console.log(res.users);
      }
    });
  }

  onSubmit(formValues: any) {
    this.submitted = true;
    var userID = this.localStorageService.getUserID().getValue();

    console.log("formvalues: ", formValues);

    if (this.getFormControls.edit.valid) {
      const projectId = this.formService.getEditingProject?.id ?? '';
      const projectName = this.form.value.edit?.title ?? '';

      //this.apollo
      //  .editProject(projectId, projectName)
      //  .pipe(
      //    catchError(async error => {
      //      this.toastService.showToast(
      //        'warning',
      //        `Couldn't update this project`
      //      );
      //      throw new Error(error);
      //    })
      //  )
      //  .subscribe(() =>
      //    this.toastService.showToast(
      //      'confirm',
      //      'Successfully updated this project'
      //    )
      //  );
    }
    if (this.getFormControls.add.valid) {
      //const name = this.form.value.add?.title ?? '';

      const formValue = { ...formValues };
      const model: ProjectCreateDTO = {
        title: formValues.add.title,
        ownerId: formValues.add.ownerId
      };

      try {
        this.projectRestService.createProject(userID, model);
      }
      catch {
        this.toastService.showToast('warning', "Error");
      }
      

      //this.apollo
      //  .addProject(name)
      //  .pipe(
      //    catchError(async error => {
      //      this.toastService.showToast(
      //        'warning',
      //        `Couldn't add a new project`
      //      );
      //      throw new Error(error);
      //    })
      //  )
      //  .subscribe(() =>
      //    this.toastService.showToast(
      //      'confirm',
      //      'Successfully added a new project'
      //    )
      //  );
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
