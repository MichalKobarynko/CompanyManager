import { NgModule } from "@angular/core";
import { AccordionItemComponent } from "./accordion-item.component";
import { CollapseButtonModule } from "../collapse-button/collapse-button.module";
import { CommonModule } from "@angular/common";
import { ContextMenuModule } from "../context-menu/context-menu.module";

@NgModule({
  declarations: [AccordionItemComponent],
  imports: [CommonModule, CollapseButtonModule, ContextMenuModule],
  exports: [AccordionItemComponent],
})
export class AccordionItemModule { }
