import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ControlValidationModule } from "../../ui/control-validation/control-validation.module";
import { LoginComponent } from "./login.component";
import { InputValidationModule } from "../../border/input-validation/input-validation.module";
import { FormValidationMessageComponent } from "../../border/form-validation-message/form-validation-message.component";
import { FormValidationMessage } from "../../border/form-validation-message/form-validation-message.module";
import { FormHeaderModule } from "../../border/form-header/form-header.module";
import { PasswordToggleDirective } from "../../directives/password-toggle.directive";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    ControlValidationModule,
    InputValidationModule,
    FormHeaderModule,
    FormValidationMessage,
    FormHeaderModule,
    FormValidationMessage
  ],
  exports: [LoginComponent]
})
export class LoginModule {
  
}
