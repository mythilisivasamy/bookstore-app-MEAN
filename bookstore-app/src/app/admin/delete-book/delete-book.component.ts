import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { BookService } from '../../shared/book.service';

@Component({
  selector: 'app-delete-book',
  template: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
  id!:string;
  isDelete!:boolean;
  constructor(
    private bookService:BookService,
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>this.id=param.get('id')!);
      this.bookService.deleteBook(this.id)
      .subscribe(()=>{
        this.isDelete=true;
        this.router.navigate(['../../booklist']);
      })
  }

}
