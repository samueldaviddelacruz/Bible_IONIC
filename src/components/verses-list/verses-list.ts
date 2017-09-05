import {Component, Input} from '@angular/core';
import {SocialSharingService} from "../../services/SocialSharingService";
import {Vibration} from "@ionic-native/vibration";
import {BibleService} from "../../services/BibleService";
import {NavController, NavParams} from "ionic-angular";

/**
 * Generated class for the VersesListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'verses-list',
  templateUrl: 'verses-list.html'
})
export class VersesListComponent {

  text: string;
  bookName: string;

  @Input()
  verses: any[] = [{cleanText: "Loading Verses...."}];

  WasVerseSelected: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public bibleService: BibleService,
              private vibration: Vibration,
              public socialSharingService: SocialSharingService) {

    console.log(this.verses)
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

}
