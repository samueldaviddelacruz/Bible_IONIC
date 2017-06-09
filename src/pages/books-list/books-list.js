var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BibleService } from "../../services/BibleService";
import { BookChaptersListPage } from "../book-chapters-list/book-chapters-list";
/**
 * Generated class for the BooksListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BooksListPage = (function () {
    function BooksListPage(navCtrl, navParams, bibleService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bibleService = bibleService;
        this.books = [];
        var testament = navParams.get('testament');
        // this.bibleService.getBooks(testament).subscribe((books)=>{
        //
        //
        //
        //
        // });
        this.books = this.bibleService.getBooks(testament);
    }
    BooksListPage.prototype.onGoToBookChaptersList = function (bookId) {
        var book = this.getSelectedBook(bookId);
        console.log(book);
        this.navCtrl.push(BookChaptersListPage, { book: book });
    };
    BooksListPage.prototype.getSelectedBook = function (bookId) {
        return this.books.filter(function (book) {
            return book.id == bookId;
        })[0];
    };
    BooksListPage.prototype.ionViewWillEnter = function () {
    };
    BooksListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BooksListPage');
    };
    return BooksListPage;
}());
BooksListPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-books-list',
        templateUrl: 'books-list.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, BibleService])
], BooksListPage);
export { BooksListPage };
//# sourceMappingURL=books-list.js.map