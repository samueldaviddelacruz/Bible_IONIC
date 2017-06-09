var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by samuel on 6/7/17.
 */
import { Http } from "@angular/http";
import 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { File } from '@ionic-native/file';
var BibleService = (function () {
    function BibleService(http, file) {
        var _this = this;
        this.http = http;
        this.file = file;
        this.books = [];
        this.file.readAsText('../Data', 'bibleBooks.js').then(function (data) {
            _this.books = data;
        });
    }
    BibleService.prototype.getBooks = function (testament) {
        // let books  = localBooks;
        //  console.log(books)
        return this.books;
    };
    BibleService.prototype.getVerses = function (chapterId) {
        // let verses  = bibleVerses[chapterId];
        // console.log(books)
        //
        // return books;
    };
    BibleService.prototype.fetchBooksFromAPI = function (testament) {
        return this.http.get('http://localhost:3000/api/bible/books').map(function (response) {
            var books = response.json() ? response.json() : [];
            console.log(books);
            return books.filter(function (book) { return book.testament == testament; });
        });
    };
    return BibleService;
}());
BibleService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, File])
], BibleService);
export { BibleService };
//# sourceMappingURL=BibleService.js.map