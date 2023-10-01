import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-toggle-button',
  templateUrl: './language-toggle-button.component.html',
  styleUrls: ['./language-toggle-button.component.css']
})
export class LanguageToggleButtonComponent implements OnInit {
  isClassActive = false;
  language: string = 'pl';
 
  constructor(
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
  }

  toggle() {
    if (this.language === 'pl')
      this.language = 'en';
    else 
      this.language = 'pl';

    this.translate.use(this.language); 
  }
}
