import { NgModule } from "@angular/core";
import { PictureComponent } from "./picture.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [PictureComponent],
  imports: [CommonModule],
  exports: [PictureComponent]
})
export class PictureModule { }


