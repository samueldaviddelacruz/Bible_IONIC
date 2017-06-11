/**
 * Created by samuel on 6/7/17.
 */
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";
//import  localBooks from '../assets/Data/bibleBooks';
import {Storage} from '@ionic/storage';
import { File } from '@ionic-native/file';

@Injectable()
export class BibleService{
  books :any= [];
  verses :any ={};
  constructor(private http: Http,private file:File,private storage:Storage) {
   // console.log(bibleVerses)






  }
  async fetchBooks(){

    let storedBooks;
    storedBooks = await this.storage.get('books');
    if(storedBooks){

      this.books = storedBooks;
      return;
    }

    let booksData;
    try{

      booksData = await this.http.get('assets/Data/bibleBooks.json').toPromise();
      this.books = booksData.json();
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
      let booksData;

      if(this.books.length > 0){

        return this.books.filter( filterCondition);
      }
      try{

        booksData = await this.http.get('assets/Data/bibleBooks.json').toPromise();
        this.books = booksData.json();
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


}
