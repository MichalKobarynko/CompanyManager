import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastModule } from "../border/toast/toast.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { ConfirmPasswordModule } from "./email-confirmation/email-confirmation.module";
import { ForgotPasswordModule } from "./forgot-password/forgot-password.module";
import { LoginModule } from "./login/login.module";
import { PrivacyModule } from "./privacy/privacy.module";
import { RegisterModule } from "./register/register.module";
import { ResetPasswordModule } from "./reset-password/reset-password.module";
import {
  TranslateModule,
} from "@ngx-translate/core";
import { TranslatePipe } from "@ngx-translate/core";
import { LanguageToggleButtonComponent } from "../border/language-toggle-button/language-toggle-button.component";
import { LanguageToggleButtonmodule } from "../border/language-toggle-button/language-toggle-button.module";
import { LoadingSpinnerModule } from "../border/loading-spinner/loading-spinner.module";
import { ControlValidationModule } from "../ui/control-validation/control-validation.module";
import { HomeModule } from "./home/home.module";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule,
    LoginModule,
    RegisterModule,
    PrivacyModule,
    AuthRoutingModule,
    ForgotPasswordModule,
    ConfirmPasswordModule,
    ResetPasswordModule,
    HomeModule,
    ToastModule,
    TranslateModule,
    LoadingSpinnerModule,
    LanguageToggleButtonmodule
  ],
  exports: [
    AuthComponent,
    AuthRoutingModule
  ],
  providers: [
    
  ]
})
export class AuthModule {

}
