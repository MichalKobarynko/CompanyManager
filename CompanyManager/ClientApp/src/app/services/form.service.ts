import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Board } from "../models/board.model";
import { Column } from "../models/column.model";
import { Project } from "../models/project.model";
import { Subtask } from "../models/subtask.model";
import { FormType } from "../models/types";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private isFormOpen = new BehaviorSubject<boolean>(false);
  private isEditing = new BehaviorSubject<boolean>(false);
  private formType = new BehaviorSubject<FormType | undefined>(undefined);
  private selectColumn = new BehaviorSubject<boolean>(false);

  private editingProject?: Project;
  private editingBoard?: Board;
  private editingColumn?: Column;
  private editingTask?: Task;
  private editingSubtask?: Subtask;

  get getIsFormOpen(): Observable<boolean> {
    return this.isFormOpen;
  }

  get getIsEditing(): Observable<boolean> {
    return this.isEditing;
  }

  get getTypeOfForm(): Observable<FormType | undefined> {
    return this.formType;
  }

  get getEditingProject() {
    return this.editingProject;
  }

  get getEditingBoard() {
    return this.editingBoard;
  }

  get getEditingColumn() {
    return this.editingColumn;
  }

  get getEditingTask() {
    return this.editingTask;
  }

  get getEditingSubtask() {
    return this.editingSubtask;
  }

  get getSelectColumn() {
    return this.selectColumn.asObservable();
  }

  onChangeFormVisibility(formType?: FormType, selectColumn?: boolean) {
    this.isFormOpen.next(!this.isFormOpen.value);
    this.isEditing.next(false);
    this.formType.next(formType);
    this.selectColumn.next(false);
    if (selectColumn) {
      this.selectColumn.next(selectColumn);
    }
  }

  onEditing(type: FormType, object: Project | Board | Column | Task | Subtask) {
    this.isEditing.next(true);
    this.formType.next(type);

    switch (type) {
      case 'project':
        this.editingProject = object as Project;
        break;
      case 'board':
        this.editingBoard = object as Board;
        break;
      case 'column':
        this.editingColumn = object as Column;
        break;
      case 'task':
        this.editingTask = object as Task;
        break;
      case 'subtask':
        this.editingSubtask = object as Subtask;
        break;
      default:
        break;
    }
  }
}
