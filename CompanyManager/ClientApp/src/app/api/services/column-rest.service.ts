import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BoardService } from "../../services/board.service";
import { ColumnCreateDTO } from "../models/column-dtos/column-create.dto";
import { Column } from "../../models/column.model";
import { Observable, map } from "rxjs";

@Injectable()
export class ColumnRestService {
  private queryUrl: string = environment.apiUrl + '/column/query';
  private commandUrl: string = environment.apiUrl + '/column/command';

  constructor(
    private http: HttpClient,
    private boardService: BoardService) { }

  public createColumn(body: ColumnCreateDTO): Observable<Column> {
    var url = this.commandUrl + '/CreateColumn';
    console.log(url)
    console.log(body)
    return this.http.post<Column>(url, body).pipe(
      map((result) => {
        //this.getProjects();
        return result;
      })
    );
  }
}
