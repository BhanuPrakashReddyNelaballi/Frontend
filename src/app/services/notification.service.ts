import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';
 
@Injectable({ providedIn: 'root' })
export class NotificationService {
private baseUrl = 'http://localhost:8080/api/notifications';
 
  constructor(private http: HttpClient) {}
 
  /** Fetch notifications for current member */
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl);
  }
}