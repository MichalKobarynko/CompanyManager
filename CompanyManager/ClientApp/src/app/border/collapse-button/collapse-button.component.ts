import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../models/project.model';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapseButtonComponent {
  @Input() project!: Project;
  @Output() toggleMenu = new EventEmitter<boolean>();
  @Input() showContent!: boolean;
  loggedInUserId$: Observable<string> | null = null;

  constructor(
    //private supabase: SupabaseService
  ) { }

  ngOnInit(): void {
    //this.loggedInUserId$ = this.supabase.getSessionObs.pipe(
    //  map(session => session?.user.id ?? '')
    //);
  }

  toggleShowContent() {
    this.showContent = !this.showContent;
    this.toggleMenu.emit(this.showContent);
  }
}
