import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Message } from '@progress/kendo-angular-conversational-ui';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:5001/messages';  // Update with your Flask server URL
  public readonly responses: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  getMessages(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.baseUrl}/subscribe`, { headers });
  }

  sendMessage(message: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/publish`, message, { headers });
  }

  reply(replay : string): void{
    const length = replay.length;
    const answer = `"${replay}" contains exactly ${length} symbols.`;
    setTimeout(
      () => this.responses.next(answer),
      1000
    );
  }
}
