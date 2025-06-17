import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MemberProfile } from '../../models/member-profile';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  member!: MemberProfile;
  loading = true;
  errorMessage = '';
  editMode = false;
  profileForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.member = profile;
        this.loading = false;
        this.profileForm = this.fb.group({
          name: [profile.name, Validators.required],
          phone: [profile.phone, Validators.required],
          address: [profile.address, Validators.required]
        });
      },
      error: (err) => {
        console.error('Failed to load profile', err);
        this.errorMessage = 'Could not load profile data';
        this.loading = false;
      }
    });
  }

  enableEdit() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.profileForm.patchValue({
      name: this.member.name,
      phone: this.member.phone,
      address: this.member.address
    });
  }

  saveChanges() {
    if (this.profileForm.invalid) return;

    const updatedData = this.profileForm.value;
    this.authService.updateProfile(updatedData).subscribe({
      next: () => {
        this.member = { ...this.member, ...updatedData };
        this.editMode = false;
      },
      error: () => {
        this.errorMessage = 'Failed to update profile';
      }
    });
  }

  goTo(route: string) {
    this.router.navigate([route]);
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
