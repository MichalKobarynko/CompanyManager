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

@Injectable()
export class BoardRestService {
  private queryUrl: string = environment.apiUrl + '/board/query';
  private commandUrl: string = environment.apiUrl + '/board/command';
  public newBoard!: BehaviorSubject<any | undefined>;

  constructor(
    private http: HttpClient,
    private boardService: BoardService) { }

  //TO na pewno do zmiany
  public getBoards(projectId: string): Observable<BoardListDTO> {
    var url = this.queryUrl + '/GetBoardsByProject/' + projectId;
    console.log(url)
    return this.http.get<BoardListDTO>(url);
  }

  //public deleteProject(userID: string, projectID: string) {
  //  var url = this.commandUrl + '/DeleteProject/' + projectID;
  //  const body = { OwnerID: userID };

  //  this.http.post(url, body).subscribe(res => {
  //    this.getProjects();
  //  });
  //}

  public createBoard(body: BoardCreateDTO): Observable<Board> {
    var url = this.commandUrl + '/CreateBoard';

    return this.http.post<Board>(url, body).pipe(
      map((result) => {
        //this.getProjects();
        return result;
      })
    );
  }

  //public updateProject(userID: string, projectID: string, body: ProjectEditDTO): Observable<Project> {
  //  var url = this.commandUrl + '/UpdateProject/' + projectID;

  //  return this.http.post<Project>(url, body).pipe(
  //    map((result) => {
  //      this.getProjects();

  //      return result;
  //    })
  //  );
  //}
}
