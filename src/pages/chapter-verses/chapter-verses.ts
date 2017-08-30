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


  async WhatsAppStrategy(verses) {

    this.vibration.vibrate(25);
    let selectedVersesTexts = this.GetSelectedVersesTexts();
    await this.socialSharing.shareViaWhatsApp(selectedVersesTexts);

    for (let verse of verses) {
      verse.isSelected = false;
    }

  }


  async ShareVerses() {
    //share logic here
    let selectedVersesTexts = this.bibleService.GetSelectedVersesTexts(this.verses);
    await this.socialSharingService.Share(selectedVersesTexts);
    this.UnselectAllVerses();
    this.WasVerseSelected = false;

  }

  UnselectAllVerses() {
    for (let verse of this.verses) {
      verse.isSelected = false;
    }
  }

  SeparateVerseNumberFromText(verseText) {
    let returnText = '';
    let numbers = '';
    for (let charIndx in verseText) {

      if (isNaN(verseText[charIndx])) {
        returnText = numbers + ' ' + verseText.substring(charIndx);
        //verseText[char] =' '+verseText[char];
        break;
      }
      numbers += verseText[charIndx];
    }

    return returnText;
  }

  GetSelectedVersesTexts() {

    return this.verses.filter((verse) => verse.isSelected)
      .reduce((versestexts, verse) => {

        let formattedCleanText = this.SeparateVerseNumberFromText(verse.cleanText);
        let formattedVerse = `${verse.reference}\n${formattedCleanText}\n`;

        return versestexts + formattedVerse + '\n';
      }, '')

  }


  isNoVerseSelected() {
    return this.verses.every((verse) => {
      return !verse.isSelected;
    })
  }


  SelectVerse(verse) {
    if (!verse.isSelected) {
      this.vibration.vibrate(25);
    }

    verse.isSelected = true;
    this.WasVerseSelected = true;


  }


  UnselectVerse(verse) {


    verse.isSelected = false;
    if (this.isNoVerseSelected()) {
      this.WasVerseSelected = false;
    }
  }

  async ngOnInit(){
    //called after the constructor and called  after the first ngOnChanges()
    this.chapter = this.navParams.get('chapter');
    this.bookName = this.navParams.get('bookName');

    this.verses = await this.bibleService.getVerses(this.chapter.id);

    if (this.chapter.versesRange) {
      let versesRange = this.chapter.versesRange;
      this.verses = this.verses.slice(versesRange.start - 1, versesRange.end);

    }


  }

  getChapterTitle(chapter) {

    return isNaN(chapter.chapter) ? chapter.chapter : `capitulo ${chapter.chapter}`

  }








}
