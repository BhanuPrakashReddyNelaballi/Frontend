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

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  onSearch(): void {
    console.log('Search clicked');
  }

  onNotifications(): void {
    console.log('Notifications clicked');
  }
}
