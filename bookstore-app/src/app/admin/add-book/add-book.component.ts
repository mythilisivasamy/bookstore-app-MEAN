import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { stringValidator,priceValidator,dateValidator } from '../../shared/customValidators';
import { BookService } from '../../shared/book.service';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-root',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  constructor(private bookservice:BookService,private router:Router){}

  title:string = 'Book Store';
  book!:Book;
    bookForm= new FormGroup({
    bookTitle : new FormControl('',[Validators.required,stringValidator(/^[a-zA-Z\s]+$/)]),
    bookAuthor : new FormControl('',[Validators.required,stringValidator(/^[a-zA-Z\s]+$/)]),
    bookGenre : new FormControl('',[Validators.required,stringValidator(/^[a-zA-Z\s]+$/)]),
    releasedYear : new FormControl('',[Validators.required,dateValidator(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/)]),
    bookPrice : new FormControl('',[Validators.required,priceValidator(/^[\d+\.\d*]+$/)]),
  })

  get bookTitle() { return this.bookForm.get('bookTitle'); }

  get bookAuthor() { return this.bookForm.get('bookAuthor'); }

  get bookGenre() { return this.bookForm.get('bookGenre'); }

  get releasedYear() { return this.bookForm.get('releasedYear'); }

  get bookPrice() { return this.bookForm.get('bookPrice'); }
  

  addBook(){
  this.book={
        book_title:this.bookTitle!.value,
        book_author:this.bookAuthor!.value,
        book_genre:this.bookGenre!.value,
        book_released_date:this.releasedYear!.value,
        book_price:this.bookPrice!.value

   }
   this.bookservice.addBook(this.book).subscribe();//()=>this.router.navigate(['../booklist']));
    }


}
