import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { FormService } from '../../../../services/form.service';
import { ToastService } from '../../../../services/toast.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { DatePipe } from '@angular/common';
import { BoardAddFormGroup, BoardEditFormGroup } from '../../../../models/forms/board-form-group';
import { AppFormGroup } from '../../../../models/forms/app-form-group.model';
import { BoardCreateDTO } from '../../../../api/models/board-dtos/board-create.dto';
import { BoardService } from '../../../../services/board.service';
import { BoardRestService } from '../../../../api/services/board-rest.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent implements OnInit {
  
  isEditing!:boolean;
  submitted = false;
  createAt: Date = new Date();
  updateAt: Date = new Date();
  boardTitle: string = '';
  projects$!: Observable<Project[] | undefined>;
  projectList: Project[] = [];
  projectId?: string = '';

  public formGroup!: FormGroup;

  constructor(
    public boardRestService: BoardRestService,
    public boardService: BoardService,
    public formService: FormService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      add: new BoardAddFormGroup(),
      edit: new BoardEditFormGroup()
    });

    this.projects$ = this.boardService.getProjects;
   
    this.boardTitle = this.formService.getEditingBoard?.name || '';

    this.boardService.getSelectedProject.subscribe(result => {
      this.projectId = result?.id;
    });

    this.formService.getIsEditing.subscribe(result => {
      this.isEditing = result;
    });

    this.loadData();
    this.cdr.detectChanges();
  }

  loadData() {
    this.formGroup.get('edit')?.patchValue({
      boardId: this.formService.getEditingBoard?.id,
      name: this.formService.getEditingBoard?.name,
      projectId: this.formService.getEditingBoard?.projectId.toUpperCase()
    });

    this.formGroup.get('add')?.patchValue({
      projectId: this.projectId
    });

    this.createAt = this.formService.getEditingBoard?.createdAt || new Date();
    this.updateAt = this.formService.getEditingBoard?.updatedAt || new Date();
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

  private editBoard(userID: string) {
    
  }
  private addBoard(userID: string) {
    var addBoard: BoardCreateDTO = <BoardCreateDTO>{};

    const addForm = this.formGroup.get('add');
    addBoard.name = addForm?.get('name')?.value;
    addBoard.projectId = addForm?.get('projectId')?.value;

    this.boardRestService.createBoard(addBoard, addBoard.projectId).subscribe({
      next: (res) => {
        this.toastService.showToast('confirm', `Utworzono tablicę: ${res.name}`);
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showToast('warning', `Błąd podczas tworzenia tablicy!`);
      }
    })
  }


  onSubmit() {
    var userID = this.localStorageService.loggedUserId$.getValue();

    if (this.editForm?.valid)
      this.editBoard(userID);

    if (this.addForm?.valid)
      this.addBoard(userID);


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
