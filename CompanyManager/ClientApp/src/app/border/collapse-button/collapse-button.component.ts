import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../models/project.model';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LocalStorageService } from '../../services/local-storage.service';
import { BoardService } from '../../services/board.service';

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
  @Input() showContent!: boolean;
  loggedInUserId$: Observable<string> | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private boardService: BoardService
  ) { }

  ngOnInit(): void {
    this.loggedInUserId$ = this.localStorageService.getUserID();

    this.boardService.getSelectedProject.subscribe(res => {
      this.showContent = this.project?.id === res?.id;
    });
  }

  toggleShowContent() {
    this.showContent = !this.showContent;
    this.toggleMenu.emit(this.showContent);
    
    console.log("toggle accordion item; ", this.project.title);
  }
}
