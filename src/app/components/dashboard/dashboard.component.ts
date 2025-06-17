import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  isSidebarMinimized = false;
  currentPage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.memberName = profile?.name || 'Guest';
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      }
    });
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  toggleMinimizedSidebar(): void {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }

  navigateTo(path: string): void {
    this.currentPage = path;
    this.router.navigate([`/${path}`]);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearSession();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
        this.authService.clearSession();
        this.router.navigate(['/login']);
      }
    });
  }
}
