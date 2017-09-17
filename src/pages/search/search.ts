import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {BibleService} from "../../services/BibleService";
import {VersesListComponent} from "../../components/verses-list/verses-list";
import {SocialSharingService} from "../../services/SocialSharingService";
import {Vibration} from "@ionic-native/vibration";


/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage extends VersesListComponent {
  books = [];
  // searchedVerses : any[] = [];
  bookTestament: string = "NT";
  searchTerm: string;


  constructor(public bibleService: BibleService,
              public vibration: Vibration,
              public socialSharingService: SocialSharingService) {

    super(bibleService, vibration, socialSharingService)
    this.verses = [];
    //console.log(this.verses)
  }

  async ngOnInit() {

    //this.books = await this.bibleService.getBooks(null);


  }

  isNotNullOrEmpty(value) {
    return value && value.trim() != '';
  }

  async searchVerses(ev) {
    this.verses = [];
    this.searchTerm = ev.target.value;

    if (this.isNotNullOrEmpty(ev.target.value)) {

      this.verses = [];
      console.log(ev.target.value);
      let BookfilterCondition = (book) => book.testament == this.bookTestament;

      if (this.bookTestament == 'all') {
        BookfilterCondition = null;
      }

      this.books = await this.bibleService.getBooks(BookfilterCondition);


      for (let book of this.books) {

        let chapters = book.chapters;

        for (let chap of chapters) {

          let verses = await this.bibleService.getVersesByChapterId(chap.id);
          for (let verse of verses) {


            if (verse.cleanText.toLowerCase().includes(this.searchTerm.toLowerCase())) {

              this.verses.push(verse);
            }


          }
        }

      }
      return;
    } else {
      this.UnselectAllVerses();
      console.log(this.verses.length);
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  highlightFoundWords(verseText) {

    let regExp = new RegExp(`\\b(${this.searchTerm})\\b`, "i");
    let replaceWord = `<b>${this.searchTerm}</b>`;

    return verseText.replace(regExp, replaceWord);

  }


}
