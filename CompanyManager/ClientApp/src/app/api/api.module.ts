import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthRestService } from "./services/auth.service";

const AUTH_REST_SERVICES = [ AuthRestService ]

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  exports: [],
  providers: [
    AUTH_REST_SERVICES
  ],
})
export class ApiModule {

}
