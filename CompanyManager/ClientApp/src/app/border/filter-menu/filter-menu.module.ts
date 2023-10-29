import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CloseBtnRoundedModule } from "../close-btn-rounded/close-btn-rounded.module";
import { FormWrapperModule } from "../form-wrapper/form-wrapper.module";
import { FilterMenuComponent } from "./filter-menu.component";

@NgModule({
  declarations: [FilterMenuComponent],
  imports: [
    CommonModule,
    CloseBtnRoundedModule,
    FormWrapperModule
  ],
  exports: [FilterMenuComponent]
})
export class FilterMenuModule { }
