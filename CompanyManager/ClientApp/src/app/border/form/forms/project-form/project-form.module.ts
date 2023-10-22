import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProjectFormComponent } from "./project-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DateFormatDirective } from "../../../../directives/date-format.directive";
import { InputValidationModule } from "../../../input-validation/input-validation.module";
import { FormFieldModule } from "../../../form-field/form-field.module";
import { FormHeaderModule } from "../../../form-header/form-header.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [ProjectFormComponent, DateFormatDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputValidationModule,
    FormHeaderModule,
    FormFieldModule,
    TranslateModule
  ],
  exports: [ProjectFormComponent]
})
export class ProjectFormModule { }
