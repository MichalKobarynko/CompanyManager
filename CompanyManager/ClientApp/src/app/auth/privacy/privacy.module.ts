import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PrivacyComponent } from "./privacy.component";

@NgModule({
  declarations: [PrivacyComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [PrivacyComponent]
})
export class PrivacyModule {

}
