import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ContextMenuComponent } from "./context-menu.component";

@NgModule({
  declarations: [ContextMenuComponent],
  imports: [CommonModule],
  exports: [ContextMenuComponent]
})
export class ContextMenuModule { }
