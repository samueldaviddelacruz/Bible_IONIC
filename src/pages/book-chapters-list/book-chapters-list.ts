import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ChapterVersesPage} from "../chapter-verses/chapter-verses";



/**
 * Generated class for the BookChaptersListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-book-chapters-list',
  templateUrl: 'book-chapters-list.html',
})
export class BookChaptersListPage {


  book:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.book = this.navParams.get('book');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookChaptersListPage');
  }

  onGoToVerses(chapter){
    this.navCtrl.push(ChapterVersesPage,{chapter:chapter,bookName:this.book.name});
  }

}
