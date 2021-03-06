import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpApi } from '../providers/http-api';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { BrowsePage } from '../pages/browse/browse';
import { UploadPage } from "../pages/upload/upload";
import { SinglePage } from "../pages/single/single";
import { GroupPage } from "../pages/group/group";
import { LogoutPage } from "../pages/logout/logout";
import { GetUsername } from "../pipes/get-username";
import { LikeBoxComponent } from "../components/like-box/like-box";
import { Safe } from "../pipes/safe";
import { Language } from "../pipes/language"
import { ProfilePage } from "../pages/profile/profile";
import { FavoriteBoxComponent } from "../components/favorite-box/favorite-box";
import { SearchPage } from "../pages/search/search";
import { AboutPage } from "../pages/about/about";


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    BrowsePage,
    SinglePage,
    GroupPage,
    UploadPage,
    SearchPage,
    LogoutPage,
    ProfilePage,
    AboutPage,
    GetUsername,
    LikeBoxComponent,
    FavoriteBoxComponent,
    Safe,
    Language
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    BrowsePage,
    SinglePage,
    GroupPage,
    UploadPage,
    SearchPage,
    LogoutPage,
    ProfilePage,
    AboutPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HttpApi, useClass: HttpApi},
  ]
})
export class AppModule {}
