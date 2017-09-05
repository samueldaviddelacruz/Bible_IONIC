import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BooksListPage} from "../books-list/books-list";
import {BibleService} from "../../services/BibleService";
import {SearchPage} from "../search/search";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private bibleService:BibleService) {

  }

  async ngOnInit(){


    //await this.bibleService.fetchBooks();
    await this.bibleService.CacheAllVerses();

  }

  GoToSearch() {
    this.navCtrl.push(SearchPage);
  }


  onLoadBooks(testament:string){

    let BookfilterCondition = (book) => book.testament == testament;
    this.navCtrl.push(BooksListPage, {BookfilterCondition});

    //this.menuCtrl.close();
  }

}
