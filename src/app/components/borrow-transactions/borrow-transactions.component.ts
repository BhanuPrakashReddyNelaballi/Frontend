import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BorrowingTransaction } from '../../models/borrowing-transaction.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
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
  memberName = '';
  sidebarOpen = true;
  /** Which tab is shown: 'active' | 'history' */
  selectedTab: 'active' | 'history' = 'active';   // ⬅️ default view

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router :Router
  ) {}
toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: profile => {
        this.memberName = profile?.name || 'Guest';
        this.loadTransactions();
      },
      error: err => console.error('Failed to load profile:', err)
    });
  }

  /** Load both active & full history lists */
  loadTransactions(): void {
    this.http
      .get<BorrowingTransaction[]>('http://localhost:8080/api/transactions/my-transactions')
      .subscribe({
        next: data => {
          this.transactions = data;
          this.activeTransactions = data.filter(tx => tx.status === 'BORROWED');
        },
        error: err => console.error('Failed to load transactions:', err)
      });
  }

  /** Switch sidebar tab */
  selectTab(tab: 'active' | 'history'): void {
    this.selectedTab = tab;
  }
  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }

  /** Return a book and refresh lists */
  returnBook(transactionId: number): void {
    this.http
      .post('http://localhost:8080/api/transactions/return', { transactionId })
      .subscribe({
        next: () => {
          alert("Book Returned");
          this.loadTransactions()},
        error: err => console.error('Failed to return book:', err)
      });
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearSession();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.authService.clearSession();
        this.router.navigate(['/login']);
      }
    });
  }
}
