import {Component, Input} from '@angular/core';
import {SocialSharingService} from "../../services/SocialSharingService";
import {Vibration} from "@ionic-native/vibration";
import {BibleService} from "../../services/BibleService";


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
  verses: any[] = [];

  WasVerseSelected: boolean = false;

  constructor(public bibleService: BibleService,
              public vibration: Vibration,
              public socialSharingService: SocialSharingService) {


  }


  ngOnChanges() {

    if (this.verses) {
      this.WasVerseSelected = this.isAnyVerseSelected();
      console.log('hey')
    }
  }



  async ShareVerses() {
    //share logic here
    let selectedVersesTexts = this.bibleService.GetSelectedVersesTexts(this.verses);
    await this.socialSharingService.Share(selectedVersesTexts);
    this.UnselectAllVerses();
    this.WasVerseSelected = false;
    this.bibleService.UpdateChapterVerses(this.verses)
  }

  UnselectAllVerses() {
    for (let verse of this.verses) {
      verse.isSelected = false;
    }

  }

  isAnyVerseSelected() {
    //console.log(this.verses.filter(verse => verse.isSelected))

    //console.log(versesLengt)
    return this.verses.filter(verse => verse.isSelected).length > 0;
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
    this.bibleService.UpdateChapterVerses(this.verses)
  }


  AddVerseToFavorites(verse) {

    if (!verse.isOnFavorites) {
      verse.isOnFavorites = false;
    }

    verse.isOnFavorites = !verse.isOnFavorites;

    this.bibleService.UpdateChapterVerses(this.verses)
  }
  UnselectVerse(verse) {


    verse.isSelected = false;
    if (this.isNoVerseSelected()) {
      this.WasVerseSelected = false;
    }
    this.bibleService.UpdateChapterVerses(this.verses)
  }


}
