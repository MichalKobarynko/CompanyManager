import { FormControl } from '@angular/forms';

export class AppFormControl extends FormControl {
  public label?: string;
  public modelProperty?: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);

    this.label = label;
    this.modelProperty = property;
  }

  getValidationMessages() {
    let messages: string[] = [];

    if (this.errors) {
      for (let errorName in this.errors) {
        switch (errorName) {
          case 'required':
            messages.push(`Proszę podać wartość w polu ${this.label}.`);
            break;
          case "pattern":
            messages.push(`Dane wprowadzone w polu ${this.label} zawierają błędne znaki.`);
            break;
          case "minLength":
            messages.push(`Tekst wprowadzony w polu ${this.label} jest za krótki.`);
            break;
          case "maxLength":
            messages.push(`Tekst wprowadzony w polu ${this.label} jest za długi.`);
            break;
          case "email":
            messages.push(`To pole powinno zawierać adres email.`);
            break;
          case "mustMatch":
            messages.push(`Hasła nie są zgodne.`);
            break;
          case "disabled value":
            messages.push(`W polu ${this.label} musisz wybrać jakąś opcję.`);
            break;
        }
      }
    }
    return messages;
  }
}
