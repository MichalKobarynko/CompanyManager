import { FormGroup } from "@angular/forms";
import { AppFormControl } from "./app-form-control.model";


export class AppFormGroup extends FormGroup {


  get formControls(): AppFormControl[] {
    return Object.keys(this.controls)
      .map(c => this.controls[c] as AppFormControl)
  }

  getControl(name: string): AppFormControl {
    var c = (this.controls[name] as AppFormControl)

    return c;
  }

  getFormValidationMessages(): string[] {
    let messages: string[] = [];

    Object.values(this.controls).forEach(c => {
      messages.push(...(c as AppFormControl).getValidationMessages());
    });

    return messages;
  }
}
