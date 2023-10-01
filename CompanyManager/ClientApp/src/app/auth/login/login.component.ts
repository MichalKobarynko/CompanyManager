import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { UserLoginDTO } from '../../api/models/user-login.dto';
import { AuthRestService } from '../../api/services/auth.service';
import { FormStatus } from '../../models/types';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSubmitted: boolean = false;
  status: FormStatus = FormStatus.OK;
  errorMessage: string = '';
  loginForm: FormGroup;
  
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authRestService: AuthRestService,
    private translateService: TranslateService,
    private loadingSpinnerService: LoadingSpinnerService,
    private toastService: ToastService
  ) {
   this. loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]]
   });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  getControl(name: string): FormControl | undefined {
    return (this.loginForm.controls[name] as FormControl)
  }

  async onSubmit(loginFormValue: any) {
    if (this.loginForm.invalid) {
      this.status = FormStatus.error;
      this.errorMessage = this.translateService.instant(
        "auth.formisinvalid"
      );
      return;
    }

    this.status = FormStatus.Loading;
    this.loadingSpinnerService.setSpinnerState(this.status);
    this.isSubmitted = true;

    const formValues = { ...loginFormValue };
    const model: UserLoginDTO = {
      email: formValues.email,
      password: formValues.password
    };

    this.authRestService.userLogin(model)
      .subscribe({
        next: (res) => {
          this.status = FormStatus.OK;
          this.loadingSpinnerService.setSpinnerState(this.status);

          localStorage.setItem("token", res.token);
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.status = FormStatus.error;
          this.loadingSpinnerService.setSpinnerState(this.status);
          this.errorMessage = err.message;
        }
      })
  }
}


