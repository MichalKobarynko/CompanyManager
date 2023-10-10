import { FormGroup } from "@angular/forms";
import { AppFormControl } from "./app-form-control.model";


export class AppFormGroup extends FormGroup {


  get formControls(): AppFormControl[] {
    return Object.keys(this.controls)
      .map(c => this.controls[c] as AppFormControl)
  }

  getControl(name: string): AppFormControl {
    return (this.controls[name] as AppFormControl)
  }

  getFormValidationMessages(): string[] {
    let messages: string[] = [];

    Object.values(this.controls).forEach(c => {
      messages.push(...(c as AppFormControl).getValidationMessages());
    });

    return messages;
  }
}
