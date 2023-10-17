import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PageForbiddenComponent } from "./page-forbidden.component";

@NgModule({
  declarations: [PageForbiddenComponent],
  imports: [RouterModule],
  exports: [PageForbiddenComponent],
})
export class PageNotFoundModule {

}
