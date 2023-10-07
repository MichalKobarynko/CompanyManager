import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BoardService } from "../../services/board.service";
import { Project } from "../../models/project.model";
import { Observable } from "rxjs";
import { ProjectListDTO } from "../models/project-dtos/project-list.dto";

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
}
