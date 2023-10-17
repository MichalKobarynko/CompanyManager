import { NgModule } from "@angular/core";
import { InputValidationComponent } from "../input-validation/input-validation.component";
import { CommonModule } from "@angular/common";
import { FormValidationMessageComponent } from "./form-validation-message.component";

@NgModule({
  declarations: [FormValidationMessageComponent],
  imports: [CommonModule],
  exports: [FormValidationMessageComponent]
})
export class FormValidationMessage { }
