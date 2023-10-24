import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ContextMenuModalService } from '../../services/context-menu-modal.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectRestService } from '../../api/services/project-rest.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { BoardRestService } from '../../api/services/board-rest.service';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-context-menu-modal',
  templateUrl: './context-menu-modal.component.html',
  styleUrls: ['./context-menu-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuModalComponent implements OnInit {
  show$ = new Observable<boolean>();
  userID$ = new BehaviorSubject<string>('');

  constructor(
    private contextMenuModalService: ContextMenuModalService,
    private boardService: BoardService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private projectRestService: ProjectRestService,
    private boardRestService: BoardRestService
  ) { }

  ngOnInit() {
    this.show$ = this.contextMenuModalService.show$;
    this.userID$ = this.localStorageService.loggedUserId$;
  }

  onHide() {
    this.contextMenuModalService.onHide();
  }

  onDelete() {
    this.contextMenuModalService.onHide();

    const id = this.contextMenuModalService.id;
    const type = this.contextMenuModalService.type;

    var userID = this.userID$.getValue();
    var selectedProject = this.boardService.getSelectedProject.getValue();

    if (userID) {
      switch (type) {
        case 'project':
          this.projectRestService.deleteProject(userID, id);
          break;
        case 'board':
          this.boardRestService.deleteBoard(id, selectedProject?.id || '');
          break;
      }
    }
    
  }
}
