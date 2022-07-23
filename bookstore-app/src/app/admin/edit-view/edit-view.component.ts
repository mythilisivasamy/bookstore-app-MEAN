import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {
  stringValidator,
  priceValidator,
  dateValidator,
} from '../../shared/customValidators';
import { Book } from '../../shared/book';
import { BookService } from '../../shared/book.service';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css'],
})
export class EditViewComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  book!: Book;
  bookForm1 = new FormGroup({
    bookId: new FormControl(''),
    bookTitle: new FormControl('', [
      Validators.required,
      stringValidator(/^[a-zA-Z\s]+$/),
    ]),
    bookAuthor: new FormControl('', [
      Validators.required,
      stringValidator(/^[a-zA-Z\s]+$/),
    ]),
    bookGenre: new FormControl('', [
      Validators.required,
      stringValidator(/^[a-zA-Z\s]+$/),
    ]),
    releasedYear: new FormControl('', [
      Validators.required,
      dateValidator(
        /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
      ),
    ]),
    bookPrice: new FormControl('', [
      Validators.required,
      priceValidator(/^[\d+\.\d*]+$/),
    ]),
  });
  get bookId() {
    return this.bookForm1.get('bookId');
  }
  get bookTitle() {
    return this.bookForm1.get('bookTitle');
  }
  get bookAuthor() {
    return this.bookForm1.get('bookAuthor');
  }
  get bookGenre() {
    return this.bookForm1.get('bookGenre');
  }
  get releasedYear() {
    return this.bookForm1.get('releasedYear');
  }
  get bookPrice() {
    return this.bookForm1.get('bookPrice');
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((param: ParamMap) =>
          this.bookService.getBook(param.get('id')!)
        )
      )
      .subscribe((val) => {
        let book: Book = val;
        this.bookForm1.setValue({
          bookId: book._id,
          bookTitle: book.book_title,
          bookAuthor: book.book_author,
          bookGenre: book.book_genre,
          releasedYear: book.book_released_date,
          bookPrice: book.book_price,
        });
      });
  }

  saveBook() {
    this.book = {
      _id: this.bookId!.value,
      book_title: this.bookTitle!.value,
      book_author: this.bookAuthor!.value,
      book_genre: this.bookGenre!.value,
      book_released_date: this.releasedYear!.value,
      book_price: this.bookPrice!.value,
    };
    this.bookService.editBook(this.book).subscribe(() => {
     this.router.navigate(['/booklist']);
    });
  }

  goToEditBook() {
    this.router.navigate(['/admin/editBook']);
  }
}
