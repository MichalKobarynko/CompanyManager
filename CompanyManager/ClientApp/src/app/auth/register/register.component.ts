import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { UserRegisterDTO } from '../../api/models/user-register.dto';
import { AuthRestService } from '../../api/services/auth.service';
import { FormStatus } from '../../models/types';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { ToastService } from '../../services/toast.service';
import { RegisterFormGroup } from '../../models/forms/register-form-group';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  showToast = false;
  status: FormStatus = FormStatus.OK;
  isSubmitted = false;
  errorMessage = '';
  formGroup!: RegisterFormGroup;

  
  constructor(
    private router: Router,
    private authRestService: AuthRestService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private loadingSpinnerService: LoadingSpinnerService
  ) { }

  ngOnInit(): void {
    this.formGroup = new RegisterFormGroup();
  }


  async onSubmit(registerFormValue: any) {
    if (this.formGroup.invalid) {
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
          this.formGroup.reset();
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
