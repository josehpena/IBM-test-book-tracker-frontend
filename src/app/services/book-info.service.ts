
//import { Book } from '../models/book.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface IBook {
  bookId?: any;
  title: string;
  author: string;
  finishedAt?: Date;
  status?: "QUERO_LER" | "LIDO" | "LENDO"
  grade?: number;
  userId?: any;
}

export interface IUser{
  name: string;
  id?: any;
}

@Injectable({
  providedIn: 'root'
})
export class BookInfoService {

  userSaved!: IUser;
  webApiUrl: string = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {
  }

  setUserId(user: IUser){
    this.userSaved = user;
  }

  public login(user: string){
    return this.http.post<any>('http://localhost:3000/user', { "name": user})
  }

  getAllBooks() {
    return this.http.get<any>(this.webApiUrl, { headers: new HttpHeaders({ 'user_id': this.userSaved.id }) })
  }

  public updateBook(book: IBook) {
    return this.http.put<IBook>("http://localhost:3000/books" + "/" + book.bookId, book, { headers: new HttpHeaders({ 'user_id': this.userSaved.id }) });
  }

  public deleteBook(book: IBook) {
    return this.http.delete<IBook>("http://localhost:3000/books" + "/" + book.bookId, { headers: new HttpHeaders({ 'user_id': this.userSaved.id }) });
  }

  public createBook(book: IBook) {
    return this.http.post<IBook>("http://localhost:3000/books", book, { headers: new HttpHeaders({ 'user_id': this.userSaved.id }) });
  }

  public editRate(book: IBook, rate: any) {
    return this.http.put<IBook>("http://localhost:3000/books/changegrade/" + book.bookId, rate , { headers: new HttpHeaders({ 'user_id': this.userSaved.id }) });
  }
}
