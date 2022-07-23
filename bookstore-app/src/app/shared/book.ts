export interface Book{
    _id?:string,
    book_title:string;
    book_author:string;
    book_genre:string;
    book_released_date:string;
    book_price:number | string;
}