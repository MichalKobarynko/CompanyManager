import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";
import { AppFormControl } from "./app-form-control.model";
import { AppFormGroup } from "./app-form-group.model";

export class ResetPasswordFormGroup extends AppFormGroup {
  constructor() {
    super({
      password: new AppFormControl('Hasło', 'password', '', Validators.compose([
        Validators.required,
        Validators.minLength(8)])),
      confirmPassword: new AppFormControl('Powtórz hasło', 'confirmPassword', '', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    })
    this.setValidators(this.matchPassword('password', 'confirmPassword'));
  }

  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['mustMatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}





