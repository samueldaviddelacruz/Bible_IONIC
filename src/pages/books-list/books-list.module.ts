import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BooksListPage } from './books-list';

@NgModule({
  declarations: [
    BooksListPage,
  ],
  imports: [
    IonicPageModule.forChild(BooksListPage),
  ],
  exports: [
    BooksListPage
  ]
})
export class BooksListPageModule {}
