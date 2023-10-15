import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { FormHeaderModule } from "../../border/form-header/form-header.module";
import { FormValidationMessage } from "../../border/form-validation-message/form-validation-message.module";
import { InputValidationModule } from "../../border/input-validation/input-validation.module";

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    FormHeaderModule,
    FormValidationMessage,
    InputValidationModule
  ],
  exports: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {

}
