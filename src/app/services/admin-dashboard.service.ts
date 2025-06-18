import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export interface DashboardStats {
  totalBooks: number;
  totalMembers: number;
}
 
@Injectable({ providedIn: 'root' })
export class AdminDashboardService {
private baseUrl = 'http://localhost:8080/api/admin';
 
  constructor(private http: HttpClient) {}
 
  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/stats`);
  }
}