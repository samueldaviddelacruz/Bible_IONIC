import {Component, ViewChild,OnInit} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {BibleService} from "../services/BibleService";
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
  //rootPage:any = HomePage;

  @ViewChild('nav')
  nav:NavController;


  onLoad(page: any){
    this.nav.setRoot(page);
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

