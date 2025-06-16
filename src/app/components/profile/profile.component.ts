import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MemberProfile } from '../../models/member-profile';
 
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  member!: MemberProfile;
  loading = true;
  errorMessage = '';
 
  constructor(private authService: AuthService) {}
 
  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.member = profile;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load profile', err);
        this.errorMessage = 'Could not load profile data';
        this.loading = false;
      }
    });
  }
}
 