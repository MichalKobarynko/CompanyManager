import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { User } from "../models/user.model";
import { Observable, combineLatest, map, take } from "rxjs";
import { Project } from "../models/project.model";
import { Board } from "../models/board.model";

@Injectable({ providedIn: 'root' })
export class BoardService {
  private projects = new BehaviorSubject<Project[] | undefined>(undefined);
  private selectedColumnId$ = new BehaviorSubject<string>('');
  private selectedTaskId$ = new BehaviorSubject<string>('');
  private selectedBoard$ = new BehaviorSubject<Board | undefined>(undefined);
  private selectedProject$ = new BehaviorSubject<Project | undefined>(
    undefined
  );
  private taskTagsFromTheSelectedBoard$ = new BehaviorSubject<string[]>([]);
  private firstLoad = true;
  private usersInTheProject$ = new BehaviorSubject<{ user: User }[]>([]);

  get getProjects(): Observable<Project[] | undefined> {
    return this.projects;
  }

  get getTags(): Observable<string[]> {
    return this.taskTagsFromTheSelectedBoard$;
  }

  get getSelectedColumnId(): Observable<string> {
    return this.selectedColumnId$;
  }

  get getSelectedTaskId(): Observable<string> {
    return this.selectedTaskId$;
  }

  get getSelectedBoard(): Observable<Board | undefined> {
    return this.selectedBoard$;
  }

  get getSelectedProject(): Observable<Project | undefined> {
    return this.selectedProject$;
  }

  get getUsersInTheProject(): Observable<{ user: User }[]> {
    return this.usersInTheProject$;
  }

  onSetUsersInTheProject(users: { user: User }[]) {
    this.usersInTheProject$.next(users);
  }

  onSetProjects(projects: Project[] | undefined) {
    this.projects.next(projects);

    if (this.firstLoad) {
      this.firstLoad = false;
      const projectsWithBoards = projects?.filter(
        project => project.boards?.length !== 0
      );

      this.onChangeSelectedProject(projectsWithBoards?.at(0));
      this.onChangeSelectedBoard(projectsWithBoards?.at(0)?.boards?.at(0));
    } else {
      this.refreshSelectedBoard();
    }
  }

  onChangeSelectedProject(project: Project | undefined) {
    this.selectedProject$.next(project);
  }

  onChangeSelectedBoard(board: Board | undefined) {
    this.selectedBoard$.next(board);

    if (!board) return;
    this.allTagsFromOneBoard(board);
  }

  onChangeSelectedColumnId(columnId: string) {
    this.selectedColumnId$.next(columnId);
  }

  onChangeSelectedTaskId(taskId: string) {
    this.selectedTaskId$.next(taskId);
  }

  allTagsFromOneBoard(board: Board | undefined) {
    const columns = board?.columns?.flatMap(column => column.column);

    const tags = columns?.flatMap(column =>
      column.tasks.flatMap(task => task.tagNames)
    );

    if (!tags) return;

    const tagsWithoutDuplicates = new Set([...tags]);
    this.taskTagsFromTheSelectedBoard$.next([
      ...tagsWithoutDuplicates.values(),
    ]);
  }

  refreshSelectedBoard() {
    const projectId$ = this.getSelectedProject.pipe(
      map(project => project?.id)
    );

    const boardId$ = this.getSelectedBoard.pipe(map(data => data?.id));

    const selectedProject$ = combineLatest([this.projects, projectId$]).pipe(
      map(([projects, projectId]) =>
        projects?.filter(project => project.id === projectId).at(0)
      )
    );

    combineLatest([selectedProject$, boardId$])
      .pipe(
        map(([project, boardId]) =>
          project?.boards?.filter(board => board.id === boardId).at(0)
        ),
        take(1)
      )
      .subscribe(board => {
        this.onChangeSelectedBoard(board);
        this.allTagsFromOneBoard(board);
      });
  }
}
