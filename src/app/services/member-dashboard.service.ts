import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { TransactionsService } from './transactions.service';
import { FinesService } from './fine.service';
 
export interface DashboardStats {
  totalBorrowed: number;
  overdueCount: number;
  pendingFines: number;
}
 
@Injectable({ providedIn: 'root' })
export class MemberDashboardService {
  // loan period in days
  private readonly loanPeriod = 14;
 
  constructor(
    private txnSvc: TransactionsService,
    private finesSvc: FinesService
  ) {}
 
  getStats(memberId: number): Observable<DashboardStats> {
    return forkJoin({
      txs: this.txnSvc.getMyTransactions(),
      fines: this.finesSvc.getMyFines(memberId)
    }).pipe(
      map(({ txs, fines }) => {
        const today = new Date().getTime();
        const totalBorrowed = txs.filter(tx => !tx.returnDate).length;
        const overdueCount = txs.filter(tx => {
          if (tx.returnDate) return false;
          const b = new Date(tx.borrowDate).getTime();
          const due = b + this.loanPeriod * 24 * 60 * 60 * 1000;
          return due < today;
        }).length;
        const pendingFines = fines.filter(f => f.status === 'PENDING').length;
        return { totalBorrowed, overdueCount, pendingFines };
      })
    );
  }
}
 