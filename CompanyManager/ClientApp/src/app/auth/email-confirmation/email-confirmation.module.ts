import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EmailConfirmationComponent } from "./email-confirmation.component";

@NgModule({
  declarations: [EmailConfirmationComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [EmailConfirmationComponent]
})
export class ConfirmPasswordModule {

}
