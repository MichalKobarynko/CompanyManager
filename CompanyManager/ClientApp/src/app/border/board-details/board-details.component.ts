import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { User } from '../../models/user.model';
import { Board } from '../../models/board.model';
import { FormService } from '../../services/form.service';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';
import { FormType, SortBy } from '../../models/types';

type BoardTypes = 'kanban' | 'table';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit, OnDestroy {
  loggedInUser$: Observable<Partial<User> | undefined> | null = null;
  projectOwnerId$: Observable<string> | null = null;
  selectedBoard$: Observable<Board | undefined> | null = null;
  usersInTheProject$: Observable<{ user: User }[]> | null = null;
  tags$!: Observable<string[]>;
  destroy$ = new Subject<void>();


  show = false;
  boardId = '';
  searchTerm = '';
  checkedTags: string[] = [];
  boardType: BoardTypes = 'kanban';
  //sortBy: SortBy = {
  //  column: 'title',
  //  direction: 'asc',
  //};

  constructor(
    private formService: FormService,
    private boardService: BoardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedBoard$ = this.boardService.getSelectedBoard;
    this.projectOwnerId$ = this.boardService.getSelectedProject.pipe(
      map(project => project?.ownerID ?? '')
    );
    this.usersInTheProject$ = this.boardService.getUsersInTheProject;
    this.tags$ = this.boardService.getTags;
    this.boardService.getTags.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (!data) {
        return;
      }

      this.checkedTags = [''];
      this.checkedTags = [...this.checkedTags, ...data];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onForm(type: FormType, selectColumn?: boolean) {
    this.formService.onChangeFormVisibility(type, selectColumn);
  }

  onSelectedTags(checkedTags: string[]) {
    this.checkedTags = checkedTags;
  }

  async onLogout() {
    //try {
    //  const { error } = await this.supabase.signOut();
    //  if (error) {
    //    console.error(error.message);
    //  }
    //  this.router.navigate(['/home']);
    //} catch (error) {
    //  if (error instanceof Error) {
    //    throw new Error(error.message);
    //  }
    //}
  }
}
