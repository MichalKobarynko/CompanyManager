import { AbstractControl, FormControl } from "@angular/forms";
import { AppFormControl } from "../../models/forms/app-form-control.model";

export class SelectDisabledValueValidator {
  static Validate(defaultValue: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value.toString();
      if (value === defaultValue)
        return { "disabled value": value };

      return null;

    }
  }
}
