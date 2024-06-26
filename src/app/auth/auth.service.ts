import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userid: string;
  private token: string | null;

  constructor(private http: HttpClient, private router: Router) {
    this.userid = JSON.parse(localStorage.getItem('user') || '{}');
    this.token = localStorage.getItem('token');
  }

  getCurrentUser(): string {
    return this.userid;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private baseUrl = 'http://localhost:5001/auth';

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = null;
    this.userid = '';
    console.log("Logging out");

    this.http.post<any>(`${this.baseUrl}/logout`, {}).subscribe(
      response => {
        console.log(response.message);
        this.router.navigate(['/auth/login']); // Redirect to login page
      },
      error => {
        console.error('Logout failed', error);
        this.router.navigate(['/auth/login']); // Redirect to login page even if the logout fails
      }
    );
  
}

  setSession(token: string, user: any): void {
    this.token = token;
    this.userid = user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
