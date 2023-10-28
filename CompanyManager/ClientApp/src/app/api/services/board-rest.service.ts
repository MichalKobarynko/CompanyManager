import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BoardService } from "../../services/board.service";
import { Project } from "../../models/project.model";
import { BehaviorSubject, Observable, Subject, catchError, map, of, throwError } from "rxjs";
import { ProjectListDTO } from "../models/project-dtos/project-list.dto";
import { ProjectCreateDTO } from "../models/project-dtos/project-create.dto";
import { ProjectEditDTO } from "../models/project-dtos/project-edit.dto";
import { BoardCreateDTO } from "../models/board-dtos/board-create.dto";
import { Board } from "../../models/board.model";
import { BoardListDTO } from "../models/board-dtos/board-list.dto";
import { BoardEditDTO } from "../models/board-dtos/board-edit.dto";

@Injectable()
export class BoardRestService {
  private queryUrl: string = environment.apiUrl + '/board/query';
  private commandUrl: string = environment.apiUrl + '/board/command';
  public newBoard!: BehaviorSubject<any | undefined>;

  constructor(
    private http: HttpClient,
    private boardService: BoardService) { }

  
  public getBoards(projectId: string) {
    var url = this.queryUrl + '/GetBoardsByProject/' + projectId;

    this.http.get<BoardListDTO>(url).subscribe(result => {
      this.boardService.onChangeBoardListByProject(result.boards);
    });
  }

  public deleteBoard(boardId: string, projectId: string) {
    var url = this.commandUrl + '/DeleteBoard/' + boardId;
    const body = { boardID: boardId };

    this.http.post(url, body).subscribe(() => {
      this.getBoards(projectId);
    });
  }

  public createBoard(body: BoardCreateDTO, projectId: string): Observable<Board> {
    var url = this.commandUrl + '/CreateBoard';

    return this.http.post<Board>(url, body).pipe(
      map((result) => {

        this.getBoards(projectId);
        return result;
      })
    );
  }

  public updateBoard(boardId: string, projectId: string, body: BoardEditDTO): Observable<Board> {
    var url = this.commandUrl + '/UpdateBoard/' + boardId;

    return this.http.post<Board>(url, body).pipe(
      map((result) => {
        this.getBoards(projectId);

        return result;
      })
    );
  }
}
