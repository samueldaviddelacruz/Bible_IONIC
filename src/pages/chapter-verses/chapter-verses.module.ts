import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChapterVersesPage } from './chapter-verses';

@NgModule({
  declarations: [
    ChapterVersesPage,
  ],
  imports: [
    IonicPageModule.forChild(ChapterVersesPage),
  ],
  exports: [
    ChapterVersesPage
  ]
})
export class ChapterVersesPageModule {}
