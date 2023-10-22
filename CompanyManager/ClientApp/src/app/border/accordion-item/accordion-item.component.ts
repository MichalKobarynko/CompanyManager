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
  showContent = false;
  loggedInUserId$!: BehaviorSubject<string>;
  selectedBoardId$: Observable<string | undefined> | null = null;
  isSelected: boolean = false;
  boards?: Board[] = [];

  constructor(
    private boardService: BoardService,
    private localStorageService: LocalStorageService,
    private boardRestService: BoardRestService,
    private cdr: ChangeDetectorRef,
    //private navigationService: NavigationService,
    private formService: FormService,
    //private supabase: SupabaseService
  ) { }

  ngOnInit(): void {
    this.selectedBoardId$ = this.boardService.getSelectedBoard.pipe(
      map(board => board?.id),
      tap(boardId =>
        this.project?.boards?.filter(board =>
          board.id === boardId ? (this.showContent = true) : null
        )
      )
    );

    this.loggedInUserId$ = this.localStorageService.getUserID();


    this.boardService.getSelectedProject.subscribe(res => {
      this.showContent = this.project?.id === res?.id;
      
    });
  }

  toggleShowContent(state: boolean) {
    console.log('project id: ', this.project.id);
    console.log("collapse button click");
    this.showContent = state;
    
    this.boardRestService.getBoards(this.project.id).subscribe(result => {
      this.boards = result.boards;
      this.cdr.detectChanges();
    });
  }


  onSelectBoard(board: Board) {
    this.boardService.onChangeSelectedProject(this.project);
    this.boardService.onChangeSelectedBoard(board);
    //this.navigationService.onMenu();
  }
}
