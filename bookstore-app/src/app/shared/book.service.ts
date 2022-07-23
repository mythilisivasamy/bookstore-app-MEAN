import { Injectable} from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable,throwError,of} from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';
import{ Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http:HttpClient) {
    this.books$=this.getBooks();
   }

  books$!:Observable<Book[]>;
  private uri='http://localhost:8000'; 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
 
  private handleError(errorResponse : HttpErrorResponse){

    if(errorResponse instanceof ErrorEvent){
      console.error(`client error,${errorResponse}`)
    }
    else{
     console.error(`server side error`)
    }
   return throwError(()=>'there is a error with service');
  }


getBooks():Observable<any>{
return  this.http.get(`${this.uri}/books`)
.pipe( //tap(books => this.books$!=of(books)),
  catchError(this.handleError)
)
}
    
 
addBook(book:Book):Observable<unknown>{
  return this.http.post(`${this.uri}/add`,book)
  
}

  getBook(id:string) {
     return this.books$.pipe(
      map((books)=>books.find(book=>book._id === id)!)
    );
  }

  editBook(book:Book):Observable<unknown>{
    return this.http.post<Book>(`${this.uri}/editBook/${book._id}`,book!,this.httpOptions)
    .pipe(catchError(this.handleError))
  }
  
  deleteBook(id:string):Observable<unknown>{
    return this.http.delete<Book>(`${this.uri}/deleteBook/${id}`,this.httpOptions)
    .pipe(catchError(this.handleError))
  }
}