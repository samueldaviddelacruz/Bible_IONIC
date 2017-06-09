/**
 * Created by samuel on 6/7/17.
 */
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";
//import  localBooks from '../assets/Data/bibleBooks';

import { File } from '@ionic-native/file';

@Injectable()
export class BibleService{
  books :any= [];
  verses :any;
  constructor(private http: Http,private file:File) {
   // console.log(bibleVerses)






  }
  async fetchBooks(){

    let booksData;
    try{

      booksData = await this.http.get('assets/Data/bibleBooks.json').toPromise();
      this.books = booksData.json();
    }catch (error){
      console.log(error)
    }

  }


  async fetchVerses(){

    let versesData;
    try{
      versesData = await this.http.get('assets/Data/bibleVerses.json').toPromise();
      this.verses = versesData.json();
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
      if(this.verses){
        console.log('cache hit');
        return this.verses[chapterId];
      }

      let versesData;
      try{
        versesData = await this.http.get('assets/Data/bibleVerses.json').toPromise();
        this.verses = versesData.json();
      }catch(error){
        console.log(error);
      }
      return this.verses[chapterId]



     // return this.http.get('assets/Data/bibleVerses.json').map( (response) => {
     //      console.log(chapterId);
     //      //console.log(response.json())
     //      let verses = response.json();
     //      console.log(verses);
     //      return verses[chapterId];
     //   })

    }


    fetchBooksFromAPI( testament:string){

      return this.http.get('http://localhost:3000/api/bible/books').map( (response) => {

        let books = response.json() ? response.json() : [];
        console.log(books);

        return books.filter( (book) => book.testament == testament);
      })

    }


}
