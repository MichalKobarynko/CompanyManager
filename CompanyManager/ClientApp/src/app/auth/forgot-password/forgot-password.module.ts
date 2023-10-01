import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ForgotPasswordComponent } from "./forgot-password.component";

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  exports: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {

}
