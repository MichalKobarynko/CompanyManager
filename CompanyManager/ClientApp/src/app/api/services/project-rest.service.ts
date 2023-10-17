import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BoardService } from "../../services/board.service";
import { Project } from "../../models/project.model";
import { BehaviorSubject, Observable, Subject, catchError, map, of, throwError } from "rxjs";
import { ProjectListDTO } from "../models/project-dtos/project-list.dto";
import { ProjectCreateDTO } from "../models/project-dtos/project-create.dto";
import { ProjectEditDTO } from "../models/project-dtos/project-edit.dto";

@Injectable()
export class ProjectRestService {
  private queryUrl: string = environment.apiUrl + '/project/query';
  private commandUrl: string = environment.apiUrl + '/project/command';
  public newProject$!: BehaviorSubject<any | undefined>;

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

  public createProject(userID: string, body: ProjectCreateDTO): Observable<Project> {
    var url = this.commandUrl + '/CreateProject';

    return this.http.post<Project>(url, body).pipe(
      map((result) => {
        this.getProjects();

        return result;
      })
    );
  }

  public updateProject(userID: string, projectID: string, body: ProjectEditDTO): Observable<Project> {
    var url = this.commandUrl + '/UpdateProject/' + projectID;

    return this.http.post<Project>(url, body).pipe(
      map((result) => {
        this.getProjects();
        
        return result;
      })
    );
  }
}
