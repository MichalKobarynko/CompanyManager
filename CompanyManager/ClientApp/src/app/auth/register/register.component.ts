import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { UserRegisterDTO } from '../../api/models/user-register.dto';
import { AuthRestService } from '../../api/services/auth.service';
import { FormStatus } from '../../models/types';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  timeoutCleaner: any | null = null;
  showToast = false;
  status: FormStatus = FormStatus.OK;
  isSubmitted = false;
  errorMessage = '';

  registerForm = this.fb.group(
    {
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.maxLength(25), Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [this.matchPassword('password', 'confirmPassword')],
    }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authRestService: AuthRestService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private loadingSpinnerService: LoadingSpinnerService
  ) { }

  closeToast() {
    
  }

  get formControls() {
    return this.registerForm.controls;
  }

  get nicknameLength() {
    return this.registerForm.controls.username.value?.length ?? 0;
  }

  get confirmPasswordLength() {
    return this.registerForm.controls.confirmPassword.value?.length ?? 0;
  }

  get passwordLength() {
    return this.registerForm.controls.password.value?.length ?? 0;
  }

  private displayToast(delay: number) {
    this.showToast = true;
    this.timeoutCleaner = setTimeout(() => {
      this.showToast = false;
    }, delay);
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
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  async onSubmit(registerFormValue: any) {
    if (this.registerForm.invalid) {
      this.status = FormStatus.error;
      this.errorMessage = this.translateService.instant(
        "auth.formisinvalid"
      );
      return;
    }

    this.isSubmitted = true;
    this.status = FormStatus.Loading;
    this.loadingSpinnerService.setSpinnerState(this.status);

    const formValues = { ...registerFormValue };
    const user: UserRegisterDTO = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      clientURI: environment.confirmemailUrl
    };

    this.authRestService.userRegister(user)
      .subscribe({
        next: () => {
          let message = this.translateService.instant(
            "auth.register.checkyouremailbox"
          );

          this.status = FormStatus.OK;
          this.loadingSpinnerService.setSpinnerState(this.status);

          this.toastService.showToast('confirm', message);
          this.registerForm.reset();
          this.router.navigate(['/auth/login']);
        }            ,
        error: (err: HttpErrorResponse) => {
          this.status = FormStatus.error;
          this.loadingSpinnerService.setSpinnerState(this.status);
          this.errorMessage = err.message;
        }
      })
  }
}
