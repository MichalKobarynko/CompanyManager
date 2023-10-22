import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FormModule } from "../../form.module";
import { FormHeaderModule } from "../../../form-header/form-header.module";
import { InputValidationModule } from "../../../input-validation/input-validation.module";
import { ColumnFormComponent } from "./column-form.component";
import { NgModule } from "@angular/core";


@NgModule({
  declarations: [ColumnFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormHeaderModule,
    InputValidationModule
  ],
  exports: [ColumnFormComponent]
})
export class ColumnFormModule { }
