import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { SigninPage } from '../pages/signin/signin';
import { HttpApi } from '../providers/http-api';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    SigninPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    SigninPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HttpApi, useClass: HttpApi}
  ]
})
export class AppModule {}
