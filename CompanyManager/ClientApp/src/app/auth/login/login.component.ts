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
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginFormGroup } from '../../models/forms/login-form-group.model';
import { AppFormGroup } from '../../models/forms/app-form-group.model';
import { AppFormControl } from '../../models/forms/app-form-control.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSubmitted: boolean = false;
  status: FormStatus = FormStatus.OK;
  errorMessage: string = '';
  loginForm!: LoginFormGroup ;
  
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authRestService: AuthRestService,
    private translateService: TranslateService,
    private loadingSpinnerService: LoadingSpinnerService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService
  ) {
    
  }

  ngOnInit(): void {
    this.loginForm = new LoginFormGroup();
    this.status = FormStatus.Loading;
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

          this.localStorageService.setClaims(res.token);
          this.toastService.showToast('confirm', `Zalogowano użytkownika o adresie email: ${model.email}`);
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


