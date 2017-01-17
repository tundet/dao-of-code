import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Dev1Component } from './dev1/dev1.component';
import { Dev2Component } from './dev2/dev2.component';
import { Dev3Component } from './dev3/dev3.component';
import {RouterModule, Routes} from "@angular/router";
import { HomepageComponent } from './homepage/homepage.component';
import {HttpapiService} from "./httpapi.service";

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'dev1', component: Dev1Component },
  { path: 'dev2', component: Dev2Component },
  { path: 'dev3', component: Dev3Component },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    Dev1Component,
    Dev2Component,
    Dev3Component,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ HttpapiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
