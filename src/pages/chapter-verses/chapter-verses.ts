import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BibleService} from "../../services/BibleService";

/**
 * Generated class for the ChapterVersesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chapter-verses',
  templateUrl: 'chapter-verses.html',
})
export class ChapterVersesPage implements OnInit{


  chapter:any={};
  bookName :string;
  verses:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public bibleService:BibleService) {






  }

  async ngOnInit(){
    //called after the constructor and called  after the first ngOnChanges()
    this.chapter = this.navParams.get('chapter');
    this.bookName = this.navParams.get('bookName');

    this.verses = await this.bibleService.getVerses(this.chapter.id)
    //   .subscribe((verses) => {
    //   //console.log(verses)
    //   this.verses = verses;
    // })

  }








}
