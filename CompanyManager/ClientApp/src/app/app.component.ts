import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('pl');
    translate.use('pl');

    this.localStorageService.refreshClaims();
  }
}
