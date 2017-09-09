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



  async ngOnInit(){
    //called after the constructor and called  after the first ngOnChanges()


  }

  async ionViewWillEnter() {
    this.chapter = this.navParams.get('chapter');
    this.bookName = this.navParams.get('bookName');

    this.verses = await this.bibleService.getVersesByChapterId(this.chapter.id);
    //console.log(this.verses)
    if (this.chapter.versesRange) {
      let versesRange = this.chapter.versesRange;
      this.verses = this.verses.slice(versesRange.start - 1, versesRange.end);

    }

  }

  getChapterTitle(chapter) {

    return isNaN(chapter.chapter) ? chapter.chapter : `capitulo ${chapter.chapter}`

  }








}
