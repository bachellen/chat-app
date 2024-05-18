import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Message, User } from '@progress/kendo-angular-conversational-ui';
import { Socket } from 'ngx-socket-io';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:5001/messages';  // Update with your Flask server URL
  public readonly responses: Subject<string> = new Subject<string>();
  currentMessages = this.socket.fromEvent<any>('new_message');


  constructor(private http: HttpClient,  private socket: Socket) {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

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
  getMessagesForUser(receiverId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.baseUrl}/get_messages?receiver_id=${receiverId}`, { headers });
  }
}
