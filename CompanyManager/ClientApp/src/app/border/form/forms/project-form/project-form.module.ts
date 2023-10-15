import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProjectFormComponent } from "./project-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DateFormatDirective } from "../../../../directives/date-format.directive";
import { InputValidationModule } from "../../../input-validation/input-validation.module";
import { FormFieldModule } from "../../../form-field/form-field.module";

@NgModule({
  declarations: [ProjectFormComponent, DateFormatDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputValidationModule,
    FormFieldModule
  ],
  exports: [ProjectFormComponent]
})
export class ProjectFormModule { }
