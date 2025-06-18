import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BorrowingTransaction } from '../models/borrowing-transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private baseUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}

  /** fetch all transactions for current member */
  getMyTransactions(): Observable<BorrowingTransaction[]> {
    return this.http.get<BorrowingTransaction[]>(`${this.baseUrl}/my-transactions`);
  }
}