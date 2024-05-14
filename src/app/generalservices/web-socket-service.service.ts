import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from '../models/message';  


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocketSubject<Message>;
  private messageSubject: Subject<Message> = new Subject<Message>();

  constructor() {
    this.connect();
  }

  connect() {
    this.socket = webSocket('ws://localhost:5001');  // Adjust URL as needed
    this.socket.subscribe(
      msg => this.messageSubject.next(msg),
      err => console.error('WebSocket error:', err),
      () => console.log('WebSocket connection completed')
    );
  }

  sendMessage(message: any) {
    this.socket.next(message);
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
