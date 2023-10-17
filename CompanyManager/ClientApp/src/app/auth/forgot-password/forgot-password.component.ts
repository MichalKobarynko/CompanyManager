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
import { ForgotPassworsdFormGroup } from '../../models/forms/forgot-password-form-group';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  formGroup: ForgotPassworsdFormGroup = <ForgotPassworsdFormGroup>{};
  public successMessage?: string = "";
  public errorMessage: string = "";
  public showSuccess: boolean = false;
  public showError: boolean = false; 

  constructor(
    private authRestService: AuthRestService,
    private toastService: ToastService,
    private router: Router,
    private loadingSpinner: LoadingSpinnerService) { }

  ngOnInit(): void {
    this.formGroup = new ForgotPassworsdFormGroup();
  }

  isFormValid() {
    return this.formGroup.valid;
  }
 

  public onSubmit() {
    this.loadingSpinner.setSpinnerState(FormStatus.Loading);
    this.showError = this.showSuccess = false;

    var forgotPassDto: ForgotPasswordDTO = <ForgotPasswordDTO>{};
    forgotPassDto.email = this.formGroup.get('email')?.value;
    forgotPassDto.clientURI = environment.resetPasswordUrl;

    this.authRestService.forgotPassword(forgotPassDto)
      .subscribe({
        next: (_) => {
          this.toastService.showToast('confirm', "Email został wysłany.");
          this.loadingSpinner.setSpinnerState(FormStatus.OK);
          this.router.navigate(['/auth/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.loadingSpinner.setSpinnerState(FormStatus.error);
          this.showError = true;
          this.errorMessage = err.message;
        }
      })
  }
}
