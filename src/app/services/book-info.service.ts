
//import { Book } from '../models/book.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Book {
  bookId: any;
  title: string;
  author: string;
  finishedAt?: Date;
  status?: "QUERO_LER" | "LIDO" | "LENDO"
  grade?: number;
  userId?: any;
}

@Injectable({
  providedIn: 'root'
})
export class BookInfoService {

  webApiUrl: string = 'http://localhost:3000/books';
  header = new HttpHeaders({ 'user_id': '82ed40cd-1730-4cbb-8608-d38f85d268d1'} )

  constructor(private http: HttpClient) {}

      getAllBooks(){
        return this.http.get<any>(this.webApiUrl, {headers: this.header})
      }

      public updateBook(book: Book) {
        return this.http.put<Book>("http://localhost:3000/books" + "/"+ book.bookId, book, {headers: this.header});
      }
      
      public deleteBook(book: Book) {
        return this.http.delete<Book>("http://localhost:3000/books" + "/"+ book.bookId, {headers: this.header});
      }

      public createBook(book: Book) {
        return this.http.post<Book>("http://localhost:3000/books", book, {headers: this.header});
      }
}
