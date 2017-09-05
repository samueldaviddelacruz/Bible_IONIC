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

import {BookChaptersListPage} from "../pages/book-chapters-list/book-chapters-list";
import {IonicStorageModule} from '@ionic/storage';
import {Vibration} from '@ionic-native/vibration';
import {ChapterVersesPage} from "../pages/chapter-verses/chapter-verses";

import {SocialSharing} from '@ionic-native/social-sharing';
import {SocialSharingService} from "../services/SocialSharingService";
import {SearchPage} from "../pages/search/search";
import {VersesListComponent} from '../components/verses-list/verses-list';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BooksListPage,
    BookChaptersListPage,
    ChapterVersesPage,
    SearchPage,
    VersesListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BooksListPage,
    BookChaptersListPage,
    ChapterVersesPage,
    SearchPage,
    VersesListComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BibleService,
    SocialSharingService,
    SocialSharing,
    Vibration
  ]
})
export class AppModule {}
