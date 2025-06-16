import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent }   from './components/profile/profile.component';
import { BorrowTransactionsComponent } from './components/borrow-transactions/borrow-transactions.component';
import { OverdueComponent }    from './components/overdue/overdue.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';
 
export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'borrow-transactions', component: BorrowTransactionsComponent },
  { path: 'overdue', component: OverdueComponent }
];
 