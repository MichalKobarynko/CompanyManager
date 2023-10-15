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
            messages.push(`Pole wymagane`);
            break;
          case "pattern":
            messages.push(`Poler zawiera błędne znaki`);
            break;
          case "minLength":
            messages.push(`Tekst jest za krótki`);
            break;
          case "maxLength":
            messages.push(`Tekst jest za długi`);
            break;
          case "email":
            messages.push(`Nieprawidłowy adres email`);
            break;
          case "mustMatch":
            messages.push(`Hasła nie są zgodne`);
            break;
          case "disabled value":
            messages.push(`Wybierz wartość z dostępnych na liście`);
            break;
        }
      }
    }
    return messages;
  }
}
