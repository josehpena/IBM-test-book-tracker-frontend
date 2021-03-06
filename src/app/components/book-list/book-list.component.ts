import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BookInfoService, IBook, IUser } from '../../services/book-info.service'

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {

  loginDialog: Boolean = true;
  books!: IBook[];
  book!: IBook;
  displayDialog!: boolean;
  bookForDialog!: IBook;
  user !: IUser
  nome!: string
  btnEdit: boolean = true;
  btnSave: boolean = true;
  bookDialog!: boolean;
  selectedBooks!: IBook[] | null;
  submitted!: boolean;
  statuses!: any[];

  

  constructor(private bookInfoService: BookInfoService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
  if(!this.loginDialog)
   this.getAllBooks();

    this.statuses = [
      {label: 'Quero Ler', value: 'QUERO_LER'},
      {label: 'Lendo', value: 'LENDO'},
      {label: 'Lido', value: 'LIDO'}
  ];
  }

  makeLogin(){
    this.loginDialog = false;
    this.bookInfoService.login(this.nome)
    .subscribe(data => {
      this.user = data.data;
      this.bookInfoService.setUserId(this.user)
      this.ngOnInit();
    })
  }

   getAllBooks(){
    this.bookInfoService.getAllBooks().subscribe(data => {
      this.books = data.data;
    });
  }

  editBook() {
    this.bookInfoService.updateBook(this.book)
    .subscribe( data => {
      this.ngOnInit();
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Livro editado', life: 3000});
    })
    this.bookDialog = false;
    this.book = {
      title: "",
      author: "",
    };
  }

  saveBook(){
    this.bookInfoService.createBook(this.book)
    .subscribe( data => {
      this.ngOnInit();
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Liro salvo', life: 3000});
    });
   
    this.bookDialog = false;
    this.book = {
      title: "",
      author: "",
    };
  }

  updateRating(book: IBook, event: any){
    this.bookInfoService.editRate(book, { grade : event.value})
    .subscribe( () => {
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Nota atualizada', life: 3000});
    });
  }


  openNew() {
    this.book = {
      title: "",
      author: "",
    };
    this.submitted = false;
    this.bookDialog = true;
    this.btnSave = true;
    this.btnEdit = false;
}

editProduct(book: IBook) {
    this.book = {...book};
    this.bookDialog = true;
    this.btnEdit = true;
    this.btnSave = false;
}

statusOk(book: IBook): boolean{
  if( book.status != "LIDO")
    return true
  else 
    return false
}

deleteProduct(book: IBook) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + book.title + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.bookInfoService.deleteBook(book)
            .subscribe( () => {
              this.ngOnInit();
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Produto deletado', life: 3000});
            });
            this.book = {
              title: "",
              author: "",
            };
        }
    });
}

hideDialog() {
    this.bookDialog = false;
    this.submitted = false;
}

}
