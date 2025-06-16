import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  standalone:true,
  selector: 'app-register',
  imports:[CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  formSubmitted = false;
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
this.registerForm = this.fb.group({
      name: ['', Validators.required],
email: ['', [Validators.required, Validators.email]],
phone: ['', Validators.required],
address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
 
  // Custom validator: passwords must match
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null
      : { passwordMismatch: true };
  }
 
  // Shortcut for template
  get f(): any { return this.registerForm.controls; }
 
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
     return;
    }
    this.loading = true;
    const { name, email, phone, address, password } = this.registerForm.value;
 
    this.authService.register({ name, email, phone, address, password })
      .subscribe({
        next: (message: string) =>{
          this.successMessage = 'Registration successful!'; 
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 500);
        },
        error:  (err)=>{
          this.errorMessage=err.error || 'Registration failed. Try again';
        }
        
  });
  }
}