import { Component, OnInit} from '@angular/core';
import { Observable ,of,Subscription} from 'rxjs';
import { BookService } from '../../shared/book.service';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books$!:Observable<Book[]>;
  subscription!:Subscription;
  constructor(private service:BookService) { }
  
  ngOnInit(): void {
   this.subscription=this.service.getBooks().subscribe(
   (books:Book[]) => {
       this.books$= of(books);
       //console.log(this.books$);
       this.service.books$=of(books);
    },
   (error:any) => {                              //error() callback
      console.error('Request failed with '+ error)
    }
  )
  
  }

  ngOnDestory(){
    this.subscription.unsubscribe();
  }

}
