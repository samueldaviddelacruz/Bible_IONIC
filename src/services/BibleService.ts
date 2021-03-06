/**
 * Created by samuel on 6/7/17.
 */
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";
//import  localBooks from '../assets/Data/bibleBooks';
import {Storage} from '@ionic/storage';

//import {Observable} from "rxjs/Observable";
import {LoadingController, ToastController} from "ionic-angular";

@Injectable()
export class BibleService{
  books :any= [];
  verses :any ={};

  constructor(private http: Http, private toast: ToastController, private storage: Storage, public loadingCtrl: LoadingController) {

  }


  freeze = (object) => Object.freeze(object);

  async UpdateChapterVerses(verses) {
    try {
      let chapterId = verses[0].chapterId;
      // let ChapterVerses = await this.storage.get(chapterId);
      //update chapterVerses

      await this.storage.set(chapterId, verses);
    } catch (err) {

      let toasty = this.toast.create({message: err.message, duration: 3000, position: 'top'})
      toasty.present()
    }

  }

  async UpdateSingleVerse(verse) {

    try {
      let chapterId = verse.chapterId;
      // let ChapterVerses = await this.storage.get(chapterId);
      //update chapterVerses
      //get previous saved verses
      let savedVerses = await this.storage.get(chapterId);
      let modifiedVerses = [];
      for (let sv of savedVerses) {
        let isModifiedVerse = sv.id == verse.id;
        let verseToPush = isModifiedVerse ? verse : sv;
        // if(sv.id == verse.id){
        //   //replace verse
        //   sv = verse;
        //   console.log(sv)
        // }

        modifiedVerses.push(verseToPush)
      }



      //save changes
      await this.storage.set(chapterId, modifiedVerses);
    } catch (err) {

      let toasty = this.toast.create({message: err.message, duration: 3000, position: 'top'})
      toasty.present()
    }

  }


  async CacheAllVerses() {
    let test_chapter_id = 'spa-RVR1960:Gen.1';
    let cachedVerses = await this.storage.get(test_chapter_id);
    if (cachedVerses) {
      return;
    }


    let loading = this.loadingCtrl.create({
      content: 'Configurando.. Por favor Espere..'
    });

    loading.present();

    let chapters;
    try {
      let response = await this.http.get(`assets/Data/BibleVerses_min.json`).toPromise();
      chapters = response.json();
      for (let chapterId in chapters) {

        for (let verse of chapters[chapterId]) {
          verse.chapterId = chapterId;
        }

        await this.storage.set(chapterId, chapters[chapterId]);
      }
      loading.dismiss();
    } catch (error) {
      console.log(error);
      loading.dismiss();
    }

    }

  async getBooks(filterCondition) {


      let booksData;
      try{

        booksData = await this.http.get('assets/Data/bibleBooks_dev.json').toPromise();

        this.books = this.freeze(booksData.json());
        //await this.storage.set('books', this.books);
      }catch (error){
        console.log(error)
      }

      if (!filterCondition) {
        return this.books;
      }

      return this.books.filter( filterCondition);
    }

  async GetFavoriteVerses() {

    let loading = this.loadingCtrl.create({
      content: 'Buscando favoritos.. Por favor Espere..'
    });

    loading.present();

    let favorites = [];
    try {

      await this.storage.forEach((versesPack) => {
        //console.log(versesPack)
        versesPack.filter(verse => verse.isOnFavorites == true)
          .forEach(favverse => favorites.push(favverse))
      });

      loading.dismiss();
    } catch (error) {
      console.log(error);

      loading.dismiss();
    }



    return favorites;
  }


  async searchVerses(searchterm, bookTestament) {

    let loading = this.loadingCtrl.create({
      content: 'Buscando.. Por favor Espere..'
    });


    loading.present();

    let BookfilterCondition = (book) => book.testament == bookTestament;
    this.books = await this.getBooks(BookfilterCondition);

    let chapterids = this.books.map(book => book.chapters).map(chapter => chapter.id);

    let searchedVerses = [];

    await this.storage.forEach((versesPack) => {
      versesPack.filter(verse => chapterids.includes(verse.chapterId) && verse.cleanText.toLowerCase().includes(searchterm.toLowerCase()))
        .forEach(searchedverse => searchedVerses.push(searchedverse))
    });

    loading.dismiss();

    return searchedVerses;
  }


  async getVersesByChapterId(chapterId: string) {
    let cachedVerses = await this.storage.get(chapterId);
    //console.log(cachedVerses)
    if (cachedVerses) {
      return cachedVerses;
    } else {

      this.CacheAllVerses();
      return this.getVersesByChapterId(chapterId)
    }

    }


    fetchBooksFromAPI( testament:string){

      return this.http.get('http://localhost:3000/api/bible/books').map( (response) => {

        let books = response.json() ? response.json() : [];
        console.log(books);

        return books.filter( (book) => book.testament == testament);
      })

    }


  private SeparateVerseNumberFromText(verseText) {
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

  GetSelectedVersesTexts(verses) {

    return verses.filter((verse) => verse.isSelected)
      .reduce((versestexts, verse) => {

        let formattedCleanText = this.SeparateVerseNumberFromText(verse.cleanText);
        let formattedVerse = `${verse.reference}\n${formattedCleanText}\n`;

        return versestexts + formattedVerse + '\n';
      }, '')

  }


}
