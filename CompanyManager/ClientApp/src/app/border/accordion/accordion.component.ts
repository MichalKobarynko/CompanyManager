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
    

    const projects: Project[] = [
      {
        id: '1',
        title: 'Projekt A',
        users: ['user1', 'user2', 'user3'],
        userId: '12c75593-2034-4824-81b5-4f4d40d47311',
        boards: [
          {
            id: '1',
            name: 'boardxxxxxxx xxxxxsssseeeeeeeeeeeeeeeeeee',
            columns: [],
            projectId: '1',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '2',
            name: 'board1',
            columns: [],
            projectId: '1',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '3',
            name: 'board3',
            columns: [],
            projectId: '1',
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-02-20'),
      },
      {
        id: '2',
        title: 'Projekt B',
        users: ['user2', 'user4'],
        userId: '12c75593-2034-4824-81b5-4f4d40d47311',
        boards: [
        ],
        createdAt: new Date('2023-02-10'),
        updatedAt: new Date('2023-03-25'),
      },
      {
        id: '3',
        title: 'Projekt C',
        users: ['user1', 'user3', 'user5'],
        userId: '12c75593-2034-4824-81b5-4f4d40d47311',
        boards: [
          
        ],
        createdAt: new Date('2023-03-05'),
        updatedAt: new Date('2023-04-18'),
      },
      {
        id: '4',
        title: 'Projekt D',
        users: ['user4'],
        userId: 'user4',
        boards: [
        ],
        createdAt: new Date('2023-04-20'),
        updatedAt: new Date('2023-05-12'),
      },
      {
        id: '5',
        title: 'Projekt E',
        users: ['user2', 'user5'],
        userId: 'user5',
        boards: [
        ],
        createdAt: new Date('2023-05-01'),
        updatedAt: new Date('2023-06-08'),
      },
    ];
    this.boardService.onSetProjects(projects);
    this.projects$ = this.boardService.getProjects;
  }
}
