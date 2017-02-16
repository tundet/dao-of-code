import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HttpApi } from '../providers/http-api';
import {UploadPage} from "../pages/upload/upload";
import {SinglePage} from "../pages/single/single";
import {LogoutPage} from "../pages/logout/logout";
import {GetUsername} from "../pipes/get-username";

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    SinglePage,
    UploadPage,
    LogoutPage,
    GetUsername

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    SinglePage,
    UploadPage,
    LogoutPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HttpApi, useClass: HttpApi},
  ]
})
export class AppModule {}
