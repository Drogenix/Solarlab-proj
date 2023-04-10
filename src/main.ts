/// <reference types="@angular/localize" />

import {enableProdMode, importProvidersFrom} from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {provideRouter} from "@angular/router";
import {routes} from "./app/routes";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {provideEnvironmentNgxMask} from "ngx-mask";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoaderInterceptor} from "./app/core/interceptors/loader.interceptor";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";
import {registerLocaleData} from "@angular/common";
import localeRu from "@angular/common/locales/ru"
import {AuthInterceptor} from "./app/core/interceptors/auth.interceptor";

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeRu,'ru')

bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
      BrowserModule,
        BrowserAnimationsModule,
      HttpClientModule,
        DynamicDialogModule
      ),
      provideRouter(routes),
      provideEnvironmentNgxMask(),
      DialogService,
      {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
      {provide:HTTP_INTERCEPTORS, useClass:LoaderInterceptor, multi:true}
    ]
})
  .catch(err => console.error(err));
