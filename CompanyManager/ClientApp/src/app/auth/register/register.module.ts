import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormHeaderModule } from '../../border/form-header/form-header.module';
import { InputValidationModule } from '../../border/input-validation/input-validation.module';
import { FormValidationMessage } from '../../border/form-validation-message/form-validation-message.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    FormHeaderModule,
    InputValidationModule,
    FormValidationMessage
  ],
  exports: [RegisterComponent],
})
export class RegisterModule { }
