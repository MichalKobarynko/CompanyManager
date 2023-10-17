import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthRestService } from '../../api/services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  showSuccess?: boolean;
  showError?: boolean;
  errorMessage?: string;

  constructor(
    private authService: AuthRestService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail() {
    this.showError = this.showSuccess = false;

    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];

    this.authService.confirmEmail(token, email)
      .subscribe({
        next: (_) => {
          let message = this.translateService.instant('auth.emailconfirm.emailsuccessfullyconfirm');

          this.toastService.showToast('confirm', message);
          this.router.navigate(['/auth/login']);
        },
        error: (err: HttpErrorResponse) => {
          let message = this.translateService.instant('auth.emailconfirm.tryagain');


          this.toastService.showToast('warning', "Try again.");
          this.router.navigate(['/auth/register']);
        }
      })
  }

}
