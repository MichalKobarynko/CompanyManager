import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BoardService } from "../../services/board.service";
import { UserListDTO } from "../models/user-dtos/user-list.dto";
import { Observable } from "rxjs";

@Injectable()
export class UserRestService {
  private queryUrl: string = environment.apiUrl + '/user/query';
  private commandUrl: string = environment.apiUrl + '/user/command';

  constructor(
    private http: HttpClient,
    private boardService: BoardService) { }

  public getAllUsers(): Observable<UserListDTO> {
    var url = this.queryUrl + '/getalluserlist';

    return this.http.get<UserListDTO>(url);
  }

}
