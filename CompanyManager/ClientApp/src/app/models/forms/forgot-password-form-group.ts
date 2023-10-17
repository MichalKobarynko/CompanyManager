import { Validators } from "@angular/forms";
import { AppFormControl } from "./app-form-control.model";
import { AppFormGroup } from "./app-form-group.model";

export class ForgotPassworsdFormGroup extends AppFormGroup {
  constructor() {
    super({
      email: new AppFormControl('Email', 'email', 'kobass18@wp.pl', Validators.compose([
        Validators.required,
        Validators.email]))
    });
  }
}
