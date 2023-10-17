import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CloseBtnRoundedModule } from "../close-btn-rounded/close-btn-rounded.module";
import { FormWrapperModule } from "../form-wrapper/form-wrapper.module";
import { InputValidationComponent } from "./input-validation.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [InputValidationComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [InputValidationComponent]
})
export class InputValidationModule { }
