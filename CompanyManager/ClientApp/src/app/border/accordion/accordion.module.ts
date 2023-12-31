import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionComponent } from "./accordion.component";
import { AccordionItemModule } from "../accordion-item/accordion-item.module";

@NgModule({
  declarations: [AccordionComponent],
  imports: [CommonModule, AccordionItemModule],
  exports: [AccordionComponent]
})
export class AccordionModule {

}
