import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CloseBtnRoundedModule } from "../close-btn-rounded/close-btn-rounded.module";
import { FormComponent } from "./form.component";
import { FormWrapperModule } from "../form-wrapper/form-wrapper.module";
import { ProjectFormModule } from "./forms/project-form/project-form.module";

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    CloseBtnRoundedModule,
    FormWrapperModule,
    ProjectFormModule
  ],
  exports: [FormComponent]
})
export class FormModule { }
