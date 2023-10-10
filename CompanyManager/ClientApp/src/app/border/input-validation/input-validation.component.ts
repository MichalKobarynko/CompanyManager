import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { AppFormControl } from '../../models/forms/app-form-control.model';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnChanges {
  @Input() control: AppFormControl | undefined;


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {

  }

  getValidationMessages() {
    let messages: string[] = [];

    if (this.control?.errors) {
      for (let errorName in this.control.errors) {
        switch (errorName) {
          case 'required':
            messages.push(`Proszę podać wartość w polu ${this.control.label}.`);
            break;
          case "pattern":
            messages.push(`Dane wprowadzone w polu ${this.control.label} zawierają błędne znaki.`);
            break;
          case "minLength":
            messages.push(`Tekst wprowadzony w polu ${this.control.label} jest za krótki.`);
            break;
          case "maxLength":
            messages.push(`Tekst wprowadzony w polu ${this.control.label} jest za długi.`);
            break;
          case "email":
            messages.push(`To pole powinno zawierać adres email.`);
            break;
          case "mustMatch":
            messages.push(`Hasła nie są zgodne.`);
            break;
          case "disabled value":
            messages.push(`W polu ${this.control.label} musisz wybrać jakąś opcję.`);
            break;
          case "Is duplicate title":
            messages.push(`Zadanie o podanym tytule już istnieje.`);
            break;
        }
      }
    }
    return messages;
  }

  showErrors(): boolean | undefined {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
