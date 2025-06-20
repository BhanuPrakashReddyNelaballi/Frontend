import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BorrowingTransaction } from '../models/borrowing-transaction.model';
import { BorrowingDto } from '../models/borrowing-dto.model';
import { BorrowBook } from '../models/borrow-book.model';
@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private baseUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}
  borrowBook(data: BorrowBook): Observable<any>{
    return this.http.post<BorrowingTransaction[]>(`${this.baseUrl}/borrow`,data);
  }
  getMyTransactions(): Observable<BorrowingTransaction[]> {
    return this.http.get<BorrowingTransaction[]>(`${this.baseUrl}/my-transactions`);
  }
  getOverDueTransactions(): Observable<BorrowingTransaction[]>{
    return this.http.get<BorrowingTransaction[]>(`${this.baseUrl}/overdue`);
  }
  getAll(): Observable<BorrowingDto[]> {
    return this.http.get<BorrowingDto[]>(`${this.baseUrl}/all`);
  }
}