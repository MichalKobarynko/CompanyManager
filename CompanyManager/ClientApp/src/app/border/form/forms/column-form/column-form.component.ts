import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormService } from '../../../../services/form.service';
import { ToastService } from '../../../../services/toast.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColumnAddFormGroup, ColumnEditFormGroup } from '../../../../models/forms/column-form-group';
import { AppFormGroup } from '../../../../models/forms/app-form-group.model';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { ColumnCreateDTO } from '../../../../api/models/column-dtos/column-create.dto';
import { ColumnRestService } from '../../../../api/services/column-rest.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BoardService } from '../../../../services/board.service';
import { Board } from '../../../../models/board.model';

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
  selectedBoard!: Board;

  constructor(
    private formService: FormService,
    private columnRestService: ColumnRestService,
    private boardService: BoardService,
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

    this.boardService.getSelectedBoard.subscribe(result => {
      this.selectedBoard = result || <Board>{};
    });

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
    var addColumn: ColumnCreateDTO = <ColumnCreateDTO>{};

    const addForm = this.formGroup.get('add');
    addColumn.name = addForm?.get('name')?.value;
    addColumn.dotColor = addForm?.get('dotColor')?.value;
    addColumn.boardId = this.selectedBoard.id;

    this.columnRestService.createColumn(addColumn).subscribe({
      next: (res) => {
        this.toastService.showToast('confirm', `Utworzono columnę: ${res.name}`);
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showToast('warning', `Błąd podczas tworzenia columny!`);
      }
    })
  }

  onSubmit() {
    var userID = this.localStorageService.loggedUserId$.getValue();

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
