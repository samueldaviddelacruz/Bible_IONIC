import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookChaptersListPage } from './book-chapters-list';

@NgModule({
  declarations: [
    BookChaptersListPage,
  ],
  imports: [
    IonicPageModule.forChild(BookChaptersListPage),
  ],
  exports: [
    BookChaptersListPage
  ]
})
export class BookChaptersListPageModule {}
