import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TransactionsService } from '../../services/transactions.service';
import { BorrowingDto } from '../../models/borrowing-dto.model';
import { AuthService } from '../../services/auth.service'; 
@Component({
  selector: 'app-admin-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  sidebarOpen = true;
  adminName = '';
  transactions: BorrowingDto[] = [];
  filtered: BorrowingDto[] = [];
 
  // Filters
  statuses = ['ALL','BORROWED','RETURNED'] as const;
  selectedStatus: typeof this.statuses[number] = 'ALL';
  searchMemberId: string = '';
 
  constructor(
    private txnService: TransactionsService,
    private router: Router,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    this.adminName = localStorage.getItem('userName') || 'Admin';
    this.loadTransactions();
  }
  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }
  loadTransactions(): void {
    this.txnService.getAll().subscribe({
      next: list => {
        this.transactions = list.map(tx => ({
          ...tx,
          status: this.computeStatus(tx)
        }));
        this.applyFilters();
      },
      error: err => console.error('Error fetching transactions', err)
    });
  }
 
  computeStatus(tx: BorrowingDto): BorrowingDto['status'] {
    if (tx.returnDate) return 'RETURNED';
    // const borrow = new Date(tx.borrowDate);
    // const due = new Date(borrow);
    // due.setDate(due.getDate() + this.loanPeriodDays);
    // if (new Date() > due) return 'OVERDUE';
    return 'BORROWED';
  }
 
  applyFilters(): void {
    this.filtered = this.transactions
      .filter(tx => this.selectedStatus === 'ALL' || tx.status === this.selectedStatus)
      .filter(tx => {
        if (!this.searchMemberId) return true;
        return tx.memberId.toString() === this.searchMemberId;
      });
  }
 
  onStatusChange(): void {
    this.applyFilters();
  }
 
  onSearchChange(): void {
    this.applyFilters();
  }
 
  // markReturned(tx: BorrowingDto): void {
  //   this.txnService.markReturned(tx.transactionId).subscribe({
  //     next: () => this.loadTransactions(),
  //     error: err => console.error('Error marking returned', err)
  //   });
  // }
 
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
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