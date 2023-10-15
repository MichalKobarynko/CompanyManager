import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ToastComponent } from "./toast.component";
import { CloseBtnRoundedModule } from "../close-btn-rounded/close-btn-rounded.module";

@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule,
    CloseBtnRoundedModule
  ],
  exports: [ToastComponent]
})
export class ToastModule {

}
