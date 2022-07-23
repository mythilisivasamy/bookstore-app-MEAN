import { Injectable } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';
import { Resolve,Router } from '@angular/router';
import { Observable,of,EMPTY} from 'rxjs';
//import { tap} from 'rxjs/operators';

 
@Injectable()
export class BookListResolverService implements Resolve<Book[]>{

  constructor(private bs:BookService,private router:Router) { }

  resolve():Observable<Book[]> | Observable<never>{
    return this.bs.getBooks();
    
  }
}
