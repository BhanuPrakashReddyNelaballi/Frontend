import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
 
interface BorrowedBook {
  title: string;
  dueDate: string;
}
 
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  memberName = '';
  showSidebar = false;
  borrowedBooks: BorrowedBook[] = [];
 
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        console.log('Profile data:', profile); // Debugging
        this.memberName = profile?.name || 'Guest';
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      }
    });
  }
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar; // Open/Close sidebar
  }
 
  /**
   * Navigate to the member profile page
   */
  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
 
  /**
   * Navigate to other dashboard sections by path
   * @param path the route path (e.g. 'borrow-transactions', 'overdue')
   */
  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
 
  /**
   * Placeholder methods for search and notifications
   */
  onSearch(): void {
    // TODO: implement search
    console.log('Search clicked');
  }
 
  onNotifications(): void {
    // TODO: implement notifications
    console.log('Notifications clicked');
  }
}
 