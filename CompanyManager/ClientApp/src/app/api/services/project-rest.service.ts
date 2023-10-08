import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BoardService } from "../../services/board.service";
import { Project } from "../../models/project.model";
import { Observable, catchError, throwError } from "rxjs";
import { ProjectListDTO } from "../models/project-dtos/project-list.dto";
import { ProjectCreateDTO } from "../models/project-dtos/project-create.dto";

@Injectable()
export class ProjectRestService {
  private queryUrl: string = environment.apiUrl + '/project/query';
  private commandUrl: string = environment.apiUrl + '/project/command';

  constructor(
    private http: HttpClient,
    private boardService: BoardService) { }

  public getProjects() {
    var url = this.queryUrl + '/getprojects';

    this.http.get<ProjectListDTO>(url).subscribe(res => {
      this.boardService.onSetProjects(res.projects);
    });
  }

  public deleteProject(userID: string, projectID: string) {
    var url = this.commandUrl + '/DeleteProject/' + projectID;
    const body = { OwnerID: userID };

    this.http.post(url, body).subscribe(res => {
      this.getProjects();
    });
  }

  public createProject(userID: string, body: ProjectCreateDTO) {
    var url = this.commandUrl + '/CreateProject';

    console.log(url);
    console.log(body);

    this.http.post(url, body)
      .pipe(
        catchError((error) => {
          console.error('An error occurred while creating the project:', error);
          return throwError(error);
        })
      )
      .subscribe(res => {
        this.getProjects();
        return res;
      });
  }
}
