import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";import { BoardFormComponent } from "./board-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormModule } from "../../form.module";
import { FormHeaderModule } from "../../../form-header/form-header.module";
import { InputValidationModule } from "../../../input-validation/input-validation.module";
 

@NgModule({
  declarations: [BoardFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormHeaderModule,
    InputValidationModule
  ],
  exports: [BoardFormComponent]
})
export class BoardFormModule { }
