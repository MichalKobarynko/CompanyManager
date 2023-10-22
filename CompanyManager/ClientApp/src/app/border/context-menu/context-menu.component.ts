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

  loggedInUserId$!: BehaviorSubject<string>;
  openedContextMenuOfElementId = '';

  constructor(
    private formService: FormService,
    private localStorageService: LocalStorageService,
    private contextMenuModalService: ContextMenuModalService
  ) { }

  ngOnInit(): void {

    this.loggedInUserId$ = this.localStorageService.getUserID();
  }

  onToggle(id: string) {
    this.openedContextMenuOfElementId = id;
  }

  delete() {
    this.contextMenuModalService.onShow();
    this.contextMenuModalService.id = this.id;
    this.contextMenuModalService.type = this.type;
    this.openedContextMenuOfElementId = '';
  }

  addBoard() {
    this.openedContextMenuOfElementId = '';
    this.formService.onChangeFormVisibility('board');
  }

  editProject() {
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
