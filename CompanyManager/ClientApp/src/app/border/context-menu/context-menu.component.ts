import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { Project } from '../../models/project.model';
import { Subtask } from '../../models/subtask.model';
import { FormType } from '../../models/types';
import { ContextMenuModalService } from '../../services/context-menu-modal.service';
import { FormService } from '../../services/form.service';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent implements OnInit  {
  @Input() id!: string;
  @Input() type!: FormType;
  @Input() editingProject?: Project;
  @Input() editingBoard?: Board;
  @Input() editingColumn?: Column;
  @Input() editingTask?: Task;
  @Input() editingSubtask?: Subtask;
  @Input() theme?: 'primary' | 'secondary' | 'acent';

  loggedInUserId$!: BehaviorSubject<string>;
  openedContextMenuOfElementId = '';

  constructor(
    private formService: FormService,
    private localStorageService: LocalStorageService,
    private boardService: BoardService,
    private contextMenuModalService: ContextMenuModalService
  ) { }

  classContainer() {
    return {
      'button-primary': this.theme === 'primary',
      'button-secondary': this.theme === 'secondary',
      'button-acent': this.theme === 'acent'
    }
  }

  ngOnInit(): void {
    this.loggedInUserId$ = this.localStorageService.loggedUserId$;
  }

  onToggle(event: Event, id: string) {
    this.openedContextMenuOfElementId = id;

    if (this.type === 'project' && this.editingProject) {
      this.boardService.onChangeSelectedProject(this.editingProject);
    }

    if (this.type === 'board' && this.editingProject) {
      this.boardService.onChangeSelectedBoard(this.editingBoard);
    }
    
    event?.stopPropagation();
  }

  delete() {
    this.contextMenuModalService.onShow();
    this.contextMenuModalService.id = this.id;
    this.contextMenuModalService.type = this.type;
    this.openedContextMenuOfElementId = '';
  }

  addElement(formType: FormType) {
    this.openedContextMenuOfElementId = '';
    this.formService.onChangeFormVisibility(formType);
  }


  editElement() {
    this.openedContextMenuOfElementId = '';
    this.formService.onChangeFormVisibility();

    if (this.type === 'project' && this.editingProject) {
      this.formService.onEditing('project', this.editingProject);
    }
    if (this.type === 'board' && this.editingBoard) {
      this.formService.onEditing('board', this.editingBoard);
    }
    if (this.type === 'column' && this.editingColumn) {
      this.formService.onEditing('column', this.editingColumn);
    }
    if (this.type === 'task' && this.editingTask) {
      this.formService.onEditing('task', this.editingTask);
    }
    if (this.type === 'subtask' && this.editingSubtask) {
      this.formService.onEditing('subtask', this.editingSubtask);
    }
  }
}
