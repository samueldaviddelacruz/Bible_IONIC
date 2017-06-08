import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BooksListPage} from "../books-list/books-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }



  onLoadBooks(testament:string){


    this.navCtrl.push(BooksListPage,{testament});

    //this.menuCtrl.close();
  }

}
