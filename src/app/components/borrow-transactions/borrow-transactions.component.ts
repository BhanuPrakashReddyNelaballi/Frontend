import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BorrowingTransaction } from '../../models/borrowing-transaction.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-borrow-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './borrow-transactions.component.html',
  styleUrls: ['./borrow-transactions.component.css']
})
export class BorrowTransactionsComponent implements OnInit {
  transactions: BorrowingTransaction[] = [];
  activeTransactions: BorrowingTransaction[] = [];
  memberName: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.memberName = profile?.name || 'Guest';
        this.loadTransactions();
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      }
    });
  }

  loadTransactions(): void {
    this.http.get<BorrowingTransaction[]>('http://localhost:8080/api/transactions/my-transactions').subscribe({
      next: (data) => {
        this.transactions = data;
        this.activeTransactions = data.filter(tx => tx.status === 'BORROWED');
      },
      error: (err) => {
        console.error('Failed to load transactions:', err);
      }
    });
  }

  returnBook(transactionId: number): void {
    const body = { transactionId };
    this.http.post('http://localhost:8080/api/transactions/return', body).subscribe({
      next: () => {
        this.loadTransactions();
      },
      error: (err) => {
        console.error('Failed to return book:', err);
      }
    });
  }
}
