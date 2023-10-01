import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ResetPasswordDTO } from '../../api/models/reset-password.dto';
import { AuthRestService } from '../../api/services/auth.service';
import { FormStatus } from '../../models/types';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup = <FormGroup>{};
;
  showSuccess?: boolean;
  showError?: boolean;
  errorMessage?: string;
  private token: string = '';
  private email: string = '';
  status: FormStatus = FormStatus.OK;

  constructor(
    private authService: AuthRestService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    {
      validators: [this.matchPassword('password', 'confirmPassword')],
      });

    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
  }

  public validateControl (controlName: string) {
    return this.resetPasswordForm?.get(controlName)?.invalid && this.resetPasswordForm?.get(controlName)?.touched
  }
  public hasError (controlName: string, errorName: string) {
    return this.resetPasswordForm?.get(controlName)?.hasError(errorName)
  }
  get formControls() {
    return this.resetPasswordForm.controls;
  }
  get passwordLength() {
    return this.resetPasswordForm.controls.password.value?.length ?? 0;
  }

  get confirmPasswordLength() {
    return this.resetPasswordForm.controls.password.value?.length ?? 0;
  }

  public onSubmit(resetPasswordFormValue: any) {
    if (this.resetPasswordForm.invalid) {
      this.status = FormStatus.error;
      this.loadingSpinnerService.setSpinnerState(this.status);

      this.errorMessage = this.translateService.instant(
        "auth.formisinvalid"
      );
      return;
    }

    this.status = FormStatus.Loading;
    this.loadingSpinnerService.setSpinnerState(this.status);

    this.showError = this.showSuccess = false;
    const resetPass = { ...resetPasswordFormValue };
    const resetPassDto: ResetPasswordDTO = {
      password: resetPass.password,
      confirmPassword: resetPass.confirmPassword,
      token: this.token,
      email: this.email
    }

    this.authService.resetPassword(resetPassDto)
      .subscribe({
        next: (_) => {
          let message = this.translateService.instant(
            "auth.resetpassword.passwordwaschange"
          );

          this.status = FormStatus.OK;
          this.loadingSpinnerService.setSpinnerState(this.status);

          this.toastService.showToast('confirm', message);
          this.router.navigate(['/auth/login'])
        },
        error: (err: HttpErrorResponse) => {
          let message = this.translateService.instant(
            "auth.resetpassword.passwordwasnotchange"
          );

          this.status = FormStatus.error;
          this.loadingSpinnerService.setSpinnerState(this.status);
          this.toastService.showToast('warning', 'Hasla nie udało sie zmienić!');
        }
      })
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
}
