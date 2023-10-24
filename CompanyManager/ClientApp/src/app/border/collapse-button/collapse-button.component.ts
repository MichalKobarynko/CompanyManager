import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../models/project.model';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LocalStorageService } from '../../services/local-storage.service';
import { BoardService } from '../../services/board.service';
import { BoardRestService } from '../../api/services/board-rest.service';

@Component({
  selector: 'app-collapse-button',
  templateUrl: './collapse-button.component.html',
  styleUrls: ['./collapse-button.component.css'],
  animations: [
    trigger('rotateState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('default<=>rotated', animate('250ms')),
    ]),
  ]
})
export class CollapseButtonComponent {
  @Input() project!: Project;
  @Output() toggleMenu = new EventEmitter<boolean>();

  showContent: boolean = false;
  loggedInUserId$: Observable<string> | null = null;
  isSelected: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private boardService: BoardService,
    private boardRestService: BoardRestService
  ) { }

  ngOnInit(): void {
    this.loggedInUserId$ = this.localStorageService.loggedUserId$;
    this.boardService?.getSelectedProject.subscribe(result => {
      this.isSelected = result?.id === this.project?.id;
      this.showContent = result?.id !== this.project?.id;
    });
  }

  toggleShowContent() {
    this.showContent = !this.showContent;
    this.boardService.onChangeSelectedProject(this.project);
    this.toggleMenu.emit(!this.showContent);
  }
}
