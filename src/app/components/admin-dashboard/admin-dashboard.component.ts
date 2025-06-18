import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AdminDashboardService, DashboardStats } from '../../services/admin-dashboard.service';
import { AuthService } from '../../services/auth.service'; 
import { profile } from 'console';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  sidebarOpen = true;
  stats: DashboardStats = { totalBooks: 0, totalMembers: 0 };
  adminName = '';
 
  constructor(private statsService: AdminDashboardService, private router: Router, private authService: AuthService) {}
 
  ngOnInit(): void {
    this.loadAdminName();
    this.loadStats();
  }
 
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
 
  loadAdminName(): void {
    this.authService.getProfile().subscribe({
      next:profile=>this.adminName=profile.name,
      error: () => this.adminName='Admin'
    })
  }
 
  loadStats(): void {
    this.statsService.getStats().subscribe({
      next: (data) => (this.stats = data),
      error: () => console.error('Failed to load stats')
    });
  }
 
  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }
 
  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    this.router.navigateByUrl('/login');
  }
}