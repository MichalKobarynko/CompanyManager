import { NgModule } from "@angular/core";
import { CloseBtnRoundedComponent } from "./close-btn-rounded.component";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [CloseBtnRoundedComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [CloseBtnRoundedComponent],
})
export class CloseBtnRoundedModule { }
