import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Project } from '../../models/project.model';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { BoardService } from '../../services/board.service';
import { FormService } from '../../services/form.service';
import { Board } from '../../models/board.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormType } from '../../models/types';
import { BoardRestService } from '../../api/services/board-rest.service';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css']
})
export class AccordionItemComponent {
  @Input() project!: Project;
  showBoardList: boolean = false;
  showContent: boolean = false;
  selectedProjectId: string = '';
  isSelected: boolean = false;

  loggedInUserId$!: BehaviorSubject<string>;
  selectedBoardId$: Observable<string | undefined> | null = null;
  boards$!: BehaviorSubject<Board[] | undefined>;

  constructor(
    private boardService: BoardService,
    private localStorageService: LocalStorageService,
    private boardRestService: BoardRestService,
    private cdr: ChangeDetectorRef,
    //private navigationService: NavigationService,
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.selectedBoardId$ = this.boardService.getSelectedBoard.pipe(
      map(board => board?.id),
      tap(boardId =>
        this.project?.boards?.filter(board =>
          board.id === boardId ? (this.showBoardList = true) : null
        )
      )
    );

    this.loggedInUserId$ = this.localStorageService.loggedUserId$;
    this.boards$ = this.boardService.getBoardsBySelectedProject;
    this.boardService.getSelectedProject.subscribe(result => {
      this.selectedProjectId = result?.id || '';
      this.showBoardList = this.project.id === this.selectedProjectId;
      this.cdr.detectChanges();
    });
  }

  toggleShowContent(state: boolean) {
    this.showBoardList = state && this.project.id === this.selectedProjectId;
    this.boardRestService.getBoards(this.project.id);
    this.cdr.detectChanges();
  }


  onSelectBoard(board: Board) {
    this.boardService.onChangeSelectedProject(this.project);
    this.boardService.onChangeSelectedBoard(board);
    //this.navigationService.onMenu();
  }
}

