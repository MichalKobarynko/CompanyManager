import { NgModule } from "@angular/core";
import { CollapseButtonComponent } from "./collapse-button.component";
import { ContextMenuModule } from "../context-menu/context-menu.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [CollapseButtonComponent],
  imports: [CommonModule, ContextMenuModule, BrowserAnimationsModule],
  exports: [CollapseButtonComponent],
})
export class CollapseButtonModule { }
