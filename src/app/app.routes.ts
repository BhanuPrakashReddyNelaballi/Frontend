import { Routes } from '@angular/router';
import { RegisterComponent }           from './components/register/register.component';
import { LoginComponent }              from './components/login/login.component';
import { AdminDashboardComponent }     from './components/admin-dashboard/admin-dashboard.component';
import { ProfileComponent }            from './components/profile/profile.component';
import { BorrowTransactionsComponent } from './components/borrow-transactions/borrow-transactions.component';
import { OverdueComponent }            from './components/overdue/overdue.component';
import { AdminGuard }                  from './guards/admin.guard';
import { TransactionsComponent } from './components/transactions/transactions.component'; 
import { ManageMembersComponent } from './components/manage-members/manage-members.component';
import { ManageBooksComponent } from './components/manage-books/manage-books.component';
import { MemberDashboardComponent } from './components/member-dashboard/member-dashboard.component';
export const routes: Routes = [
  // Default redirect to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 
  // Public routes
  { path: 'register', component: RegisterComponent },
  { path: 'login',    component: LoginComponent },
 
  // Member-only routes
  { path: 'dashboard',          component: MemberDashboardComponent },
  { path: 'profile',            component: ProfileComponent },
  { path: 'borrow-transactions', component: BorrowTransactionsComponent },
  { path: 'overdue',            component: OverdueComponent },
 
  // Admin-only route
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },
  {path:'manage-members', component:ManageMembersComponent},
  {path:'manage-books',component:ManageBooksComponent},
  {path:'transactions',component:TransactionsComponent},
 

];