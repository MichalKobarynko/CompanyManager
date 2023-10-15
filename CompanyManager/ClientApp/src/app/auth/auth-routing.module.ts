import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundError } from "rxjs";
import { AdminGuard } from "../guards/admin.guard";
import { AuthGuard } from "../guards/auth.guard";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { AuthComponent } from "./auth.component";
import { EmailConfirmationComponent } from "./email-confirmation/email-confirmation.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { RegisterComponent } from "./register/register.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "auth",
    redirectTo: "auth/home",
    pathMatch: "full",
  },
  {
    path: "auth",
    component: AuthComponent,
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "emailconfirmation",
        component: EmailConfirmationComponent
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordComponent
      },
      {
        path: 'resetpassword',
        component: ResetPasswordComponent
      },
      { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard, AdminGuard] },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
