/**
 * Created by samuel on 6/7/17.
 */
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";
//import  localBooks from '../assets/Data/bibleBooks';
import {Storage} from '@ionic/storage';


@Injectable()
export class BibleService{
  books :any= [];
  verses :any ={};

  constructor(private http: Http, private storage: Storage) {


  }


  freeze = (object) => Object.freeze(object)


  async fetchBooks(){

    let storedBooks;
    storedBooks = await this.storage.get('books');
    if(storedBooks){

      this.books = this.freeze(storedBooks);
      return;
    }

    let booksData;
    try{

      booksData = await this.http.get('assets/Data/bibleBooks.json').toPromise();
      this.books = this.freeze(booksData.json());
      await this.storage.set('books',this.books);
    }catch (error){
      console.log(error)
    }

  }


  async fetchVerses(){

    let storedVerses;
    storedVerses = await this.storage.get('verses');
    if(storedVerses){

      this.verses  = storedVerses;

      return;
    }

    let versesData;
    try{
      versesData = await this.http.get('assets/Data/bibleVerses.json').toPromise();

      this.verses = versesData.json();

      await this.storage.set('verses',this.verses);

    }catch(error){
      console.log(error);
    }

  }



    async getBooks(filterCondition){


      // let storedBooks;
      // storedBooks = await this.storage.get('books');
      // if (storedBooks) {
      //
      //   this.books = this.freeze(storedBooks);
      //   return this.books.filter( filterCondition);
      // }

      let booksData;
      try{

        booksData = await this.http.get('assets/Data/bibleBooks_dev.json').toPromise();

        this.books = this.freeze(booksData.json());
        //await this.storage.set('books', this.books);
      }catch (error){
        console.log(error)
      }

      return this.books.filter( filterCondition);
    }


    async getVerses(chapterId:string){



      if(this.verses[chapterId]){
        console.log('cache hit!');
        return this.verses[chapterId];
      }

      let versesData;
      try{
        versesData = await this.http.get(`assets/Data/VersesByChapter/${chapterId}.json`).toPromise();
        this.verses[chapterId] = versesData.json();
        console.log(this.verses[chapterId])
      }catch(error){
        console.log(error);
      }
      return this.verses[chapterId]

    }


    fetchBooksFromAPI( testament:string){

      return this.http.get('http://localhost:3000/api/bible/books').map( (response) => {

        let books = response.json() ? response.json() : [];
        console.log(books);

        return books.filter( (book) => book.testament == testament);
      })

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

  GetSelectedVersesTexts(verses) {

    return verses.filter((verse) => verse.isSelected)
      .reduce((versestexts, verse) => {

        let formattedCleanText = this.SeparateVerseNumberFromText(verse.cleanText);
        let formattedVerse = `${verse.reference}\n${formattedCleanText}\n`;

        return versestexts + formattedVerse + '\n';
      }, '')

  }


}
