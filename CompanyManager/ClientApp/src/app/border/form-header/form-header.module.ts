import { NgModule } from "@angular/core";
import { FormHeaderComponent } from "./form-header.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [FormHeaderComponent],
  imports: [CommonModule, TranslateModule],
  exports: [FormHeaderComponent]
})
export class FormHeaderModule { }
