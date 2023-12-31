import { Component } from '@angular/core';
import { Project } from '../../models/project.model';
import { BoardService } from '../../services/board.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent {
  projects$!: Observable<Project[] | undefined>;


  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.projects$ = this.boardService.getProjects;
  }
}
