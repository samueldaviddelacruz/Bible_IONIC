import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BooksListPage} from "../books-list/books-list";
import {BibleService} from "../../services/BibleService";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private bibleService:BibleService) {

  }

  async ngOnInit(){


    await this.bibleService.fetchBooks();
   // await this.bibleService.fetchVerses();

  }



  onLoadBooks(testament:string){


    this.navCtrl.push(BooksListPage,{testament});

    //this.menuCtrl.close();
  }

}
