import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from './book';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  url: string = 'http://localhost:8080/book';

  constructor(private http: HttpClient) { }

  getBooks(){
    return this.http.get<Book[]>(this.url);
  }

  delete(id: number){
    const deleteUrl = this.url+'/delete/'+id;
    return this.http.delete<boolean>(deleteUrl);
  }

  create(book: Book) : Observable<Book>{
    const createUrl = this.url+'/create';
    return this.http.post<Book>(createUrl,book);
  }

  update(book: Book){
    const updateUrl = this.url+'/update';
    return this.http.put<Book>(updateUrl,book);
  }
}
