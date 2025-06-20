import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MemberDashboardService } from '../../services/member-dashboard.service';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';
 import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {
  stats = { totalBorrowed: 0, overdueCount: 0, pendingFines: 0 };
  showNotifications = false;
  notifications: Notification[] = [];
  memberName = '';
  memberId!: number;
  sidebarOpen = true;

  constructor(
    private dashSvc: MemberDashboardService,
    private notifSvc: NotificationService,
    private router: Router,
    private authService: AuthService,
  ) {}
 
  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: profile => {
        this.memberName = profile?.name || 'Guest';
        this.memberId = profile.id;
        this.loadStats();
        this.loadNotifications();
      },
      error: err => console.error('Failed to load profile:', err)
    });
  }
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }
  loadStats(): void {
    this.dashSvc.getStats(this.memberId).subscribe({
      next: s => this.stats = s,
      error: err => console.error('Failed to load stats', err)
    });
  }
 loadNotifications(): void{
    this.notifSvc.getNotifications().subscribe({
      next: list => this.notifications = list,
      error: err => console.error('Failed to load notifications', err)
    });
 }
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
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