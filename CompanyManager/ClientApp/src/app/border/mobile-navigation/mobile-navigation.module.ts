import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MobileNavigationComponent } from "./mobile-navigation.component";
import { AccordionItemModule } from "../accordion-item/accordion-item.module";
import { AccordionModule } from "../accordion/accordion.module";

@NgModule({
  declarations: [MobileNavigationComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AccordionModule
  ],
  exports: [MobileNavigationComponent],
})
export class MobileNavigationModule { }
