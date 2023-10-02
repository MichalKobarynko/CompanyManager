import { NgModule } from "@angular/core";
import { AccordionItemComponent } from "./accordion-item.component";
import { CollapseButtonModule } from "../collapse-button/collapse-button.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [AccordionItemComponent],
  imports: [CommonModule, CollapseButtonModule],
  exports: [AccordionItemComponent],
})
export class AccordionItemModule { }
