import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ContextMenuComponent } from "./context-menu.component";
import { CloseBtnRoundedModule } from "../close-btn-rounded/close-btn-rounded.module";

@NgModule({
  declarations: [ContextMenuComponent],
  imports: [CommonModule, CloseBtnRoundedModule],
  exports: [ContextMenuComponent]
})
export class ContextMenuModule { }
