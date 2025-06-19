import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';
import { MembershipStatus } from '../models/membership-status.model';
@Injectable({ providedIn: 'root' })
export class MemberService {
  private baseUrl = 'http://localhost:8080/api/members';

  constructor(private http: HttpClient  ) {}

  /** Fetch all members */
  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}/getMembers`);
  }

  /** Update a member */
  updateMember(memberId: number, data: Partial<Member>): Observable<Member> {
    return this.http.put<Member>(`${this.baseUrl}/update/${memberId}`, data);
  }
  updateMembershipStatus(memberId: number, status: MembershipStatus): Observable<Member> {
    const params = new HttpParams().set('status', status);
    return this.http.put<Member>(
      `${this.baseUrl}/update/membershipStatus/${memberId}`,
      null,
      { params }
    );
  }

  /** Delete a member */
  deleteMember(memberId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${memberId}`);
  }
}