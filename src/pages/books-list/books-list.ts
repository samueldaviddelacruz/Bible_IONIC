import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BibleService} from "../../services/BibleService";
import {BookChaptersListPage} from "../book-chapters-list/book-chapters-list";

/**
 * Generated class for the BooksListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-books-list',
  templateUrl: 'books-list.html',
})
export class BooksListPage implements OnInit {

  books = [];
  title:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public bibleService:BibleService) {



  }
 async ngOnInit(){
    //called after the constructor and called  after the first ngOnChanges()

    let testament = this.navParams.get('testament');
    this.books = await this.bibleService.getBooks((book) => book.testament == testament);
    console.log(this.books)
  }

  onGoToBookChaptersList(bookId){

      let book = this.getSelectedBook(bookId);


      console.log(book);
      this.navCtrl.push(BookChaptersListPage,{book});

  }

  getSelectedBook(bookId){

    return this.books.filter( (book)=>{
          return book.id == bookId;
    })[0];
  }

  ionViewWillEnter(){


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BooksListPage');
  }

}
