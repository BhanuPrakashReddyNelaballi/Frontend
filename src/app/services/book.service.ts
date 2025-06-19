// src/app/services/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  /** Fetch all books */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/getbooks`);
  }

  /** Add a new book */
  addBook(data: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/add`, data);
  }

  /** Update available copies only */
  updateCopies(bookId: number, available: number): Observable<Book> {
    const params = new HttpParams().set('availableCopies', available);
    return this.http.put<Book>(`${this.baseUrl}/${bookId}`, null, { params });
  }

  /** Delete a book */
  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${bookId}`);
  }
}
