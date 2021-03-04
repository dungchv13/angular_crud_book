import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service';
import {Book} from '../book';
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  bookList: Book[]=[];

  book = {
    id:0,
    title:'',
    author:'',
    description:''
  };



  public deleteId!: number;
  isDelete = false;

  bookUpdate = {
    id: 0,
    title: "string",
    author: "string",
    description: "string"
  };

  constructor(private sv: BookService,private router: Router) { }

  ngOnInit(): void {
    this.sv.getBooks().subscribe(res => this.bookList = res);
  }


  openModalEdit(b: Book) {
    this.bookUpdate = {
      id: b.id,
      title: b.title,
      author: b.author,
      description: b.description};
    $('#editModal').modal('show');

  }

  openModalConfirm(id: number) {
    this.deleteId = id;
    $('#confirmDel').modal('show');
  }

  delete() {
    this.sv.delete(this.deleteId).subscribe(res => {
      this.isDelete = res;
      this.sv.getBooks().subscribe(res => this.bookList = res);
    });
    $('#confirmDel').modal('hide');


  }

  submit() {
    this.sv.create(this.book).subscribe(data => {
      this.book=data;
      this.bookList.push(data);
    });

    $('#createModal').modal('hide');

  }

  usave() {
    this.sv.update(this.bookUpdate).subscribe(res => {this.sv.getBooks().subscribe(res => this.bookList = res);});
    $('#editModal').modal('hide');

  }


}
