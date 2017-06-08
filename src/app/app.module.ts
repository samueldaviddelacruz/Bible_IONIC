import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from "@angular/http";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {BooksListPage} from "../pages/books-list/books-list";
import {BibleService} from "../services/BibleService";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BooksListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BooksListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BibleService
  ]
})
export class AppModule {}
