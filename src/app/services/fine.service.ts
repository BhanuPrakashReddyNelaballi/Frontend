import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fine } from '../models/fine.model';

@Injectable({ providedIn: 'root' })
export class FinesService {
  private baseUrl = 'http://localhost:8080/api/fines';

  constructor(private http: HttpClient) {}

  /** Get fines for current member */
  getMyFines(memberId: number): Observable<Fine[]> {
    return this.http.get<Fine[]>(`${this.baseUrl}/member/${memberId}`);
  }

  /** Pay a fine */
  payFine(fineId: number): Observable<Fine> {
    return this.http.post<Fine>(`${this.baseUrl}/pay`, { fineId });
  }
  getPendingFines(): Observable<Fine[]>{
    return this.http.get<Fine[]>(`${this.baseUrl}/pending`);
  }
  // calcuateFine(): void{
  //    return this.http.get(`${this.baseUrl}/calculate`);
  // }
}