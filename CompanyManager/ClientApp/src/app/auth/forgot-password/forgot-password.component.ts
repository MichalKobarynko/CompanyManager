import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ForgotPasswordDTO } from '../../api/models/forgot-password.dto';
import { UserLoginDTO } from '../../api/models/user-login.dto';
import { AuthRestService } from '../../api/services/auth.service';
import { FormStatus } from '../../models/types';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup = <FormGroup>{};
  public successMessage?: string;
  public errorMessage?: string;
  public showSuccess?: boolean;
  public showError?: boolean;

  constructor(
    private authRestService: AuthRestService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    })
  }
 

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  public onSubmit(forgotPasswordFormValue: any) {

    this.showError = this.showSuccess = false;

    const formValues = { ...forgotPasswordFormValue };

    const forgotPassDto: ForgotPasswordDTO = {
      email: formValues.email,
      clientURI: environment.resetPasswordUrl
    }

    this.authRestService.forgotPassword(forgotPassDto)
      .subscribe({
        next: (_) => {
          this.toastService.showToast('confirm', "Email został wysłany.");
          this.router.navigate(['/auth/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.showError = true;
          this.errorMessage = err.message;
        }
      })
  }
}
