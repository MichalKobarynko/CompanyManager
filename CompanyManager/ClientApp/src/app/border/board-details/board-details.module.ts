import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BoardDetailsComponent } from "./board-details.component";
import { ContextMenuModule } from "../context-menu/context-menu.module";
import { FormsModule } from "@angular/forms";
import { FilterMenuModule } from "../filter-menu/filter-menu.module";

@NgModule({
  declarations: [BoardDetailsComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ContextMenuModule,
    FilterMenuModule,
    FormsModule 
  ],
  exports: [BoardDetailsComponent],
})
export class BoardDetailsModule { }

