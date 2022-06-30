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
      console.log(data.data);
      this.books = data.data;
    });
  }

  // deleteBook(book: Book) {
  //   console.log('Book Deleted');
     
    // this.bookInfoService.deleteBook(book)
    //   .subscribe( data => {
    //     this.ngOnInit();
    //     alert("Book Deleted successfully.");
    //   });
  // }

  // onBookAdd(){
  // //   this.bookForDialog = {
  // //    title: null, author: null
  // // };
  //   this.displayDialog = true;
  // }

  editBook() {
    this.bookInfoService.updateBook(this.book)
    .subscribe( data => {
      this.ngOnInit();
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Edited', life: 3000});
    })
    this.bookDialog = false;
    this.book = {
      title: "",
      author: "",
      bookId: ""
    };
  }

  saveBook(){
    console.log('Book Saved');
    console.log(this.book)
    this.bookInfoService.createBook(this.book)
    .subscribe( data => {
      this.ngOnInit();
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
    });
   
    this.bookDialog = false;
    this.book = {
      title: "",
      author: "",
      bookId: ""
    };
  }


  openNew() {
    this.book = {
      title: "",
      author: "",
      bookId: ""
    };
    this.submitted = false;
    this.bookDialog = true;
}

deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected books?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
            this.books = this.books.filter(val => !this.selectedBooks?.includes(val));
            this.selectedBooks = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

editProduct(book: IBook) {
    this.book = {...book};
    this.bookDialog = true;
}

deleteProduct(book: IBook) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + book.title + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.books = this.books.filter(val => val.bookId !== book.bookId);
            this.bookInfoService.deleteBook(book)
            .subscribe( data => {
              this.ngOnInit();
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
            });
            this.book = {
              title: "",
              author: "",
              bookId: ""
            };
            
        }
    });
}

hideDialog() {
    this.bookDialog = false;
    this.submitted = false;
}

// saveProduct() {
//     this.submitted = true;

//     if (this.book.title.trim()) {
//         if (this.book.bookId) {
//             this.books[this.findIndexById(this.book.bookId)] = this.book;
//             this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
//         }
//         else {
//           this.bookInfoService.createBook(this.bookForDialog)
//           .subscribe( data => {
//             this.ngOnInit();
//             alert("Book Created successfully.");
//           })
    
//             this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
//         }

//         this.books = [...this.books];
//         this.bookDialog = false;
//         this.book = {
//           title: "",
//           author: "",
//           bookId: ""
//         };
//     }
// }

// findIndexById(id: string): number {
//     let index = -1;
//     for (let i = 0; i < this.books.length; i++) {
//         if (this.books[i].bookId === id) {
//             index = i;
//             break;
//         }
//     }

//     return index;
// }

}
