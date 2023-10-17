import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormHeaderModule } from '../../border/form-header/form-header.module';
import { FormValidationMessage } from '../../border/form-validation-message/form-validation-message.module';
import { InputValidationModule } from '../../border/input-validation/input-validation.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    FormHeaderModule,
    FormValidationMessage,
    InputValidationModule
  ],
  exports: [ResetPasswordComponent],
})
export class ResetPasswordModule { }
