import {Component, ViewChild,OnInit} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {BibleService} from "../services/BibleService";
import {BooksListPage} from "../pages/books-list/books-list";
// import {BookChaptersListPage} from "../pages/book-chapters-list/book-chapters-list";
// import {ChapterVersesPage} from "../pages/chapter-verses/chapter-verses";
import {FavoriteVersesPage} from "../pages/favorite-verses/favorite-verses";
import {SearchPage} from "../pages/search/search";
import {HowtoPage} from "../pages/howto/howto";
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  async ngOnInit( ){

    await this.platform.ready();
  //  await this.bibleService.fetchBooks();
    //await this.bibleService.fetchVerses();
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }

  homePage:any = HomePage;
  // booklistPage:any =BooksListPage;
  // bookChapterListPage:any=BookChaptersListPage;
  // chapterversesPage:any=ChapterVersesPage;
  favoritesversesPage: any = FavoriteVersesPage;
  searchPage: any = SearchPage;
  howToPage: any = HowtoPage;
  //rootPage:any = HomePage;


  @ViewChild('nav')
  nav:NavController;


  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  GoToSearch() {
    this.nav.push(SearchPage);
  }

  GoToFavorites() {

    this.nav.push(FavoriteVersesPage);
  }

  onLoadBooks(testament: string) {

    let BookfilterCondition = (book) => book.testament == testament;
    this.nav.push(BooksListPage, {BookfilterCondition});

    this.menuCtrl.close();
  }

  constructor(public platform: Platform,public statusBar: StatusBar, public splashScreen: SplashScreen,private menuCtrl:MenuController,private bibleService:BibleService) {


    // this.platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //
    //
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    // });


  }

}

