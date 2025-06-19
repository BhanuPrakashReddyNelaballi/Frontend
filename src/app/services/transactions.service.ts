import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BorrowingTransaction } from '../models/borrowing-transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private baseUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}

  getMyTransactions(): Observable<BorrowingTransaction[]> {
    return this.http.get<BorrowingTransaction[]>(`${this.baseUrl}/my-transactions`);
  }
  getOverDueTransactions(): Observable<BorrowingTransaction[]>{
    return this.http.get<BorrowingTransaction[]>(`${this.baseUrl}/overdue`);
  }
}