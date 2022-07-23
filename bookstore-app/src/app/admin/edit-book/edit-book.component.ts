import { Component, OnInit } from '@angular/core';
import { Observable ,Subscription} from 'rxjs';
import { BookService } from '../../shared/book.service';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  books$!:Observable<Book[]>;
  subscription!:Subscription;
  constructor(private service:BookService) { }

  ngOnInit():Observable<Book[]> {
   return  this.books$=this.service.getBooks();
      }

 }
