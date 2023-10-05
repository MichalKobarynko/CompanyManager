import { Component, Input } from '@angular/core';
import { Project } from '../../models/project.model';
import { Observable, map, tap } from 'rxjs';
import { BoardService } from '../../services/board.service';
import { FormService } from '../../services/form.service';
import { Board } from '../../models/board.model';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css']
})
export class AccordionItemComponent {
  @Input() project!: Project;
  showContent = false;
  loggedInUserId$: Observable<string | undefined> | null = null;
  selectedBoardId$: Observable<string | undefined> | null = null;

  constructor(
    private boardService: BoardService,
    private localStorageService: LocalStorageService,
    //private navigationService: NavigationService,
    private formService: FormService,
    //private supabase: SupabaseService
  ) { }

  ngOnInit(): void {
    this.selectedBoardId$ = this.boardService.getSelectedBoard.pipe(
      map(board => board?.id),
      tap(boardId =>
        this.project.boards.filter(board =>
          board.id === boardId ? (this.showContent = true) : null
        )
      )
    );

    this.loggedInUserId$ = this.localStorageService.getUserID();
    this.boardService.getSelectedProject.subscribe(res => {
      this.showContent = this.project?.id === res?.id;
    });
  }

  onForm() {
    this.boardService.onChangeSelectedProject(this.project);
    this.boardService.onChangeSelectedBoard(this.project.boards.at(0));
    this.formService.onChangeFormVisibility('board');
  }

  toggleShowContent(state: boolean) {
    this.showContent = state;
  }

  onSelectBoard(board: Board) {
    this.boardService.onChangeSelectedProject(this.project);
    this.boardService.onChangeSelectedBoard(board);
    //this.navigationService.onMenu();
  }
}
