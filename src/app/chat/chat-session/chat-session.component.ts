import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../chat.service';
import { Message, SendMessageEvent, User } from '@progress/kendo-angular-conversational-ui';
import { ChangeDetectorRef } from '@angular/core';
import { ChatViewComponent } from '../chat-view/chat-view.component';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-session',
  templateUrl: './chat-session.component.html',
  styleUrl: './chat-session.component.scss'
})
export class ChatSessionComponent {
  @Input() receiverId: string = '';
  @Input() parent!: ChatViewComponent;

  currentUser: User = {
    id: ''
  };
  chatUser : User =  {
    id: ''
  }
  private messageSubscription: Subscription | null = null;


  constructor(private authService: AuthService, private chatService: ChatService, private cdr: ChangeDetectorRef) {
    this.currentUser.id = this.authService.getCurrentUser();}

  ngOnInit(): void {
    this.chatUser.id = this.receiverId;
    this.subscribeToMessages();
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  subscribeToMessages(): void {
    this.messageSubscription = this.chatService.currentMessages.subscribe((message: any) => {
      const parsedData = JSON.parse(message.message);
      if (message.receiver_id === this.receiverId && message.sender_id === this.currentUser.id) {
        this.parent.addMessageToSelectedTab({ text: parsedData.message.text, author: this.currentUser,  timestamp: new Date(parsedData.timestamp) });
        this.cdr.detectChanges();
      } else if (message.receiver_id === this.currentUser.id && message.sender_id === this.receiverId) {
        this.parent.addMessageToSelectedTab({ text: parsedData.message.text, author: this.chatUser ,  timestamp: new Date(parsedData.timestamp)});
        this.cdr.detectChanges();
      }
    });
  }

  onUserSelected(userId: string): void {
    this.chatUser.id = userId;
  }

  
    
  sendMessage(e: SendMessageEvent, flag: boolean=false): void {
    const timestamp = new Date()
    const messageText = e.message;
    const message = {
      'message': messageText,
      'receiver_id': this.getReceiverId(), // Implement getReceiverId based on your logic
    };
    this.parent.addMessageToSelectedTab({ text: e.message.text, author: this.currentUser, timestamp: timestamp });
    if(!flag){
    this.publishMessage(message)}
  }
  publishMessage(message: { message: Message; receiver_id: string; }) {
    this.chatService.sendMessage(message).subscribe(response => {
      console.log(response)
    }, error => {
      console.error('Message sending failed', error);
    });
  }

  getReceiverId(): string {
   return this.receiverId
  } 
  getMessages(): Message[] {
    return this.parent.getMessagesForSelectedTab();
  }
}


