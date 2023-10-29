import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormService } from '../../services/form.service';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';
import { FormType } from '../../models/types';

@Component({
  selector: 'app-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.css'],
  animations: [
    trigger('smoothSlide', [
      state(
        'initial',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      state(
        'final',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition('initial<=>final', animate('300ms')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavigationComponent {
  showMenu$!: Observable<boolean>;

  constructor(
    private formService: FormService,
    private navigationService: NavigationService,
    private router: Router) { }

  ngOnInit(): void {
    this.showMenu$ = this.navigationService.getShowMenu();
  }

  onMenu() {
    this.navigationService.onMenu();
  }

  onForm(type: FormType) {
    this.formService.onChangeFormVisibility(type);
  }

  async onLogout() {
    
  }
}
