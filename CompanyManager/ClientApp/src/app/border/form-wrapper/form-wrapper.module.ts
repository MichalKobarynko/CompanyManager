import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CloseBtnRoundedModule } from "../close-btn-rounded/close-btn-rounded.module";
import { FormWrapperComponent } from "./form-wrapper.component";

@NgModule({
  declarations: [FormWrapperComponent],
  imports: [CommonModule, CloseBtnRoundedModule],
  exports: [FormWrapperComponent]
})
export class FormWrapperModule { }
