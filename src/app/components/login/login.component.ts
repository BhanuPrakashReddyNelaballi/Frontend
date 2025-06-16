import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthResponseDto } from '../../models/auth-response.model';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  // 1️⃣ just declare it here
  loginForm!: FormGroup;
 
  loading = false;
  errorMessage = '';
  successMessage='';
  formSubmitted = false;
 
  // fb is injected *here*
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // 2️⃣ now fb is available, so build the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
 
  get f(): any { return this.loginForm.controls; }
 
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
 
    const { email, password } = this.loginForm.value;
    this.auth.login(email!, password!).subscribe({
      next: (res: AuthResponseDto) => {
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('role', res.userRole);
        this.successMessage = 'Login successful! ';
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
        }, 500);
      },
      error: err => {
        this.errorMessage = err.error || 'Invalid credentials';
        this.loading = false;
      }
    });
  }
}
 