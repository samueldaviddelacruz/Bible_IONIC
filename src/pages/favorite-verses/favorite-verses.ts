import {Component} from '@angular/core';
//import {  NavController, NavParams } from 'ionic-angular';
import {BibleService} from "../../services/BibleService";
import {Vibration} from "@ionic-native/vibration";
import {SocialSharingService} from "../../services/SocialSharingService";
import {VersesListComponent} from "../../components/verses-list/verses-list";

/**
 * Generated class for the FavoriteVersesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorite-verses',
  templateUrl: 'favorite-verses.html',
})
export class FavoriteVersesPage extends VersesListComponent {

  constructor(public bibleService: BibleService,
              public vibration: Vibration,
              public socialSharingService: SocialSharingService) {
    super(bibleService, vibration, socialSharingService);
    this.verses = [];
  }

  async ngOnInit() {


  }

  async ionViewWillEnter() {
    this.verses = await this.bibleService.GetFavoriteVerses()
  }

  async RemoveFromFavorites(verse) {
    verse.isOnFavorites = false;
    await this.bibleService.UpdateSingleVerse(verse)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteVersesPage');
  }

}
