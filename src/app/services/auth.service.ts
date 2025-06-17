import { Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegisterRequestDto } from "../models/user.model";
import { AuthResponseDto } from "../models/auth-response.model";
import { MemberProfile } from "../models/member-profile";
@Injectable({providedIn: 'root'})
export class AuthService{
    private baseUrl = 'http://localhost:8080/api/auth';

    constructor(private http: HttpClient){}

    register(dto: RegisterRequestDto): Observable<string>{
        return this.http.post<string>(`${this.baseUrl}/register`, dto,{
            responseType: 'text' as 'json'
        });
    }
    login(email: string, password: string): Observable<AuthResponseDto> {
        return this.http.post<AuthResponseDto>(
              `${this.baseUrl}/login`,
              { email, password }
            );
          }
    getProfile(): Observable<MemberProfile> {
  const token = localStorage.getItem('token'); // or sessionStorage
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<MemberProfile>(`${this.baseUrl}/profile`, { headers });
}
logout(): Observable<string> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<string>(`${this.baseUrl}/logout`, {}, { headers });
  }

  clearSession(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  }
}