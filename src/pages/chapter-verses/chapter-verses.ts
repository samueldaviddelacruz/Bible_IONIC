import { Component,OnInit } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BibleService} from "../../services/BibleService";
import {SocialSharing} from '@ionic-native/social-sharing';
import {ToastController} from 'ionic-angular';
import {Vibration} from '@ionic-native/vibration';
import {SocialSharingService} from "../../services/SocialSharingService";
/**
 * Generated class for the ChapterVersesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chapter-verses',
  templateUrl: 'chapter-verses.html',
})
export class ChapterVersesPage implements OnInit{


  chapter:any={};
  bookName :string;
  verses:any[];
  WasVerseSelected: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public bibleService: BibleService,
              private socialSharing: SocialSharing,
              private toastCtrl: ToastController,
              private vibration: Vibration,
              public socialSharingService: SocialSharingService) {
  }


  // async ShareVerses() {
  //   //share logic here
  //   let selectedVersesTexts = this.bibleService.GetSelectedVersesTexts(this.verses);
  //   await this.socialSharingService.Share(selectedVersesTexts);
  //   this.UnselectAllVerses();
  //   this.WasVerseSelected = false;
  //
  // }
  //
  // UnselectAllVerses() {
  //   for (let verse of this.verses) {
  //     verse.isSelected = false;
  //   }
  // }
  //
  //
  //
  // isNoVerseSelected() {
  //   return this.verses.every((verse) => {
  //     return !verse.isSelected;
  //   })
  // }
  //
  //
  // SelectVerse(verse) {
  //   if (!verse.isSelected) {
  //     this.vibration.vibrate(25);
  //   }
  //
  //   verse.isSelected = true;
  //   this.WasVerseSelected = true;
  //
  //
  // }
  //
  //
  // UnselectVerse(verse) {
  //
  //
  //   verse.isSelected = false;
  //   if (this.isNoVerseSelected()) {
  //     this.WasVerseSelected = false;
  //   }
  // }

  async ngOnInit(){
    //called after the constructor and called  after the first ngOnChanges()
    this.chapter = this.navParams.get('chapter');
    this.bookName = this.navParams.get('bookName');

    this.verses = await this.bibleService.getVersesByChapterId(this.chapter.id);

    if (this.chapter.versesRange) {
      let versesRange = this.chapter.versesRange;
      this.verses = this.verses.slice(versesRange.start - 1, versesRange.end);

    }

  }

  getChapterTitle(chapter) {

    return isNaN(chapter.chapter) ? chapter.chapter : `capitulo ${chapter.chapter}`

  }








}
