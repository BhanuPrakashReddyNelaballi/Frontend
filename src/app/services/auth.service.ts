import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
            // JWT should already be attached via interceptor or headers
        return this.http.get<MemberProfile>(`${this.baseUrl}/profile`);
        }
}