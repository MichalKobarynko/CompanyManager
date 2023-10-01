import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  exports: [ResetPasswordComponent],
})
export class ResetPasswordModule { }
