import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {
  sidebarOpen = true;
  memberName = '';
  searchTerm = '';
 
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.authService.getProfile().subscribe({
next: profile => this.memberName = profile.name,
      error: () => this.memberName = 'Member'
    });
  }
 
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
 
  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }
 
  logout(): void {
    this.authService.clearSession();
    this.router.navigateByUrl('/login');
  }
 
  onSearch(): void {
    // Implement search handling here
    console.log('Search term:', this.searchTerm);
  }
}