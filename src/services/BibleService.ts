/**
 * Created by samuel on 6/7/17.
 */
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";

@Injectable()
export class BibleService{
  constructor(private http: Http) {

  }
    getBooks(testament:string){

        return this.http.get('http://localhost:3000/api/bible/books').map( (response) => {

          let books = response.json() ? response.json() : [];
          console.log(books);

          return books.filter( (book) => book.testament == testament);
        })


    }


}
