import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { BorderModule } from './border/border.module';
import { ToastService } from './services/toast.service';
import { FormService } from './services/form.service';
import { ContextMenuModalService } from './services/context-menu-modal.service';
import { ApiModule } from './api/api.module';
import { ErrorHandlerService } from './interceptors/error-handler.service';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastModule } from './border/toast/toast.module';
import {
  TranslateLoader,
  TranslateModule,
  TranslateParser,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateICUParser } from "ngx-translate-parser-plural-select";
import { LanguageToggleButtonmodule } from './border/language-toggle-button/language-toggle-button.module';
import { LoadingSpinnerModule } from './border/loading-spinner/loading-spinner.module';
import { LoadingSpinnerService } from './services/loading-spinner.service';

export function tokenGetter() {
  return localStorage.getItem("token");
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BorderModule,
    AuthModule,
    ApiModule,
    PageNotFoundModule,
    AppRoutingModule,
    ToastModule,
    LanguageToggleButtonmodule,
    LoadingSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      parser: {
        provide: TranslateParser,
        useClass: TranslateICUParser,
      },
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7218"],
        disallowedRoutes: ["localhost:7218/auth/"]
      }
    })
  ],
  providers: [
    ToastService,
    FormService,
    LoadingSpinnerService,
    ContextMenuModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

