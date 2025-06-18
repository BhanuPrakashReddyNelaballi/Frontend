import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
 
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
 
  canActivate(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      return true;
    }
    // Not an admin → redirect to member dashboard
    this.router.navigateByUrl('/dashboard');
    return false;
  }
}