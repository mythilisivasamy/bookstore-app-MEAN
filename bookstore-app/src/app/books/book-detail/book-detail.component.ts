import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { BookService } from '../../shared/book.service'
import { Book } from '../../shared/book';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit  {
book$!:Observable<Book>;

  constructor(
    private route: ActivatedRoute,
    private service: BookService
  ) { }

  ngOnInit(): void {
       this.book$=this.route.paramMap.pipe(
        switchMap((params: ParamMap)=>this.service.getBook(params.get('id')!))
      );
  }

}
