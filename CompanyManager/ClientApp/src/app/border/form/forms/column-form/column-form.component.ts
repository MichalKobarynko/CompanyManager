import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormService } from '../../../../services/form.service';
import { ToastService } from '../../../../services/toast.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColumnAddFormGroup, ColumnEditFormGroup } from '../../../../models/forms/column-form-group';
import { AppFormGroup } from '../../../../models/forms/app-form-group.model';
import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.css']
})
export class ColumnFormComponent implements OnInit {
  isEditing: boolean = false;
  submitted = false;
  createAt: Date = new Date();
  updateAt: Date = new Date();
  formGroup!: FormGroup;

  constructor(
    private formService: FormService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.formService.getIsEditing.subscribe(result => {
      this.isEditing = result;
    });

    this.formGroup = this.formBuilder.group({
      add: new ColumnAddFormGroup(),
      edit: new ColumnEditFormGroup()
    });

    this.loadData();
  }

  loadData() {
    this.formGroup?.get('edit')?.patchValue({
      columnId: this.formService.getEditingColumn?.id,
      name: this.formService.getEditingColumn?.name,
      dotColor: this.formService.getEditingColumn?.dotColor,
    })

    this.createAt = this.formService.getEditingColumn?.createdAt || new Date();
    this.updateAt = this.formService.getEditingColumn?.updatedAt || new Date();
    this.cdr.detectChanges();
  }

  get addForm(): AppFormGroup {
    return (this.formGroup.get('add') || null) as AppFormGroup;
  }

  get editForm(): AppFormGroup {
    return (this.formGroup.get('edit') || null) as AppFormGroup;
  }

  get isFormValid() {
    if (this.isEditing && this.editForm.valid) {
      return true;
    }
    else if (!this.isEditing && this.addForm.valid) {
      return true;
    }
    return false;
  }

  private editColumn(userID: string) {
    //var editProject: ProjectEditDTO = <ProjectEditDTO>{};

    //const editForm = this.form.get('edit');
    //editProject.projectID = editForm?.get('projectId')?.value;
    //editProject.title = editForm?.get('title')?.value;
    //editProject.ownerId = editForm?.get('ownerId')?.value;


    //this.projectRestService.updateProject(userID, editProject.projectID, editProject).subscribe({
    //  next: (res) => {
    //    this.toastService.showToast('confirm', `Edytowano projekt: ${res.title}`);
    //  },
    //  error: (err: HttpErrorResponse) => {
    //    this.toastService.showToast('warning', `Błąd podczas edycji projektu!`);
    //  }
    //})
  }
  private addColumn(userID: string) {
    //var addProject: ProjectCreateDTO = <ProjectCreateDTO>{};

    //const addForm = this.form.get('add');
    //addProject.title = addForm?.get('title')?.value;
    //addProject.ownerId = addForm?.get('ownerId')?.value;

    //this.projectRestService.createProject(userID, addProject).subscribe({
    //  next: (res) => {
    //    this.toastService.showToast('confirm', `Utworzono projekt: ${res.title}`);
    //  },
    //  error: (err: HttpErrorResponse) => {
    //    this.toastService.showToast('warning', `Błąd podczas tworzenia projektu!`);
    //  }
    //})
  }

  onSubmit() {
    var userID = this.localStorageService.getUserID().getValue();

    if (this.editForm?.valid)
      this.editColumn(userID);

    if (this.addForm?.valid)
      this.addColumn(userID);


    if (this.addForm?.invalid && this.editForm?.invalid) {
      return;
    }

    this.formGroup.reset();
    this.formService.onChangeFormVisibility();
  }

  close() {
    this.formService.onChangeFormVisibility();
  }
}
