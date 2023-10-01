import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ToastService } from "../services/toast.service";
import { BorderComponent } from "./border.component";
import { ToastComponent } from './toast/toast.component';
import { ToastModule } from "./toast/toast.module";
import { ContextMenuModule } from "./menu/context-menu.module";
import { FormService } from "../services/form.service";
import { ContextMenuModalService } from "../services/context-menu-modal.service";
import { RouterModule } from "@angular/router";
import { LanguageToggleButtonmodule } from "./language-toggle-button/language-toggle-button.module";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageToggleButtonComponent } from "./language-toggle-button/language-toggle-button.component";
import { LoadingSpinnerModule } from "./loading-spinner/loading-spinner.module";
import { ControlValidationModule } from "../ui/control-validation/control-validation.module";

@NgModule({
  declarations: [BorderComponent],
  exports: [BorderComponent],
  imports: [
    CommonModule,
    ToastModule,
    ContextMenuModule,
    RouterModule,
    LanguageToggleButtonmodule,
    LoadingSpinnerModule,
    TranslateModule
  ],
  providers: [
    
  ]
})
export class BorderModule {

}
