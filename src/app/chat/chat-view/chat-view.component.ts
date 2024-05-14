import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../chat.service';
import { Message, SendMessageEvent } from '@progress/kendo-angular-conversational-ui';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  currentUser: any;

  constructor(private authService: AuthService, private chatService: ChatService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.chatService.getMessages().subscribe(messages => {
      // Adjusting the format of messages to match Kendo chat component expectations

        this.messages.push({
          text: messages.message,
          author: { id: this.getReceiverId(), name: 'User' }, // Adjust based on actual data structure
          timestamp: new Date(messages.timestamp)
        });
   
    });
    this.messages = [...this.messages];
    this.newMessage = '';
  }

  sendMessage(e: SendMessageEvent): void {
    const messageText = e.message;
    const message = {
      'message': messageText,
      'receiver_id': this.getReceiverId(), // Implement getReceiverId based on your logic
    };
    this.messages = [...this.messages, e.message];

    this.chatService.sendMessage(message).subscribe(response => {

      // this.messages.push({text: response.message,
      //   timestamp: response.timestamp,  
      //   author :{id: this.authService.getCurrentUser(), name:'User'},
      // });
  
      this.newMessage = '';
    }, error => {
      console.error('Message sending failed', error);
    });
  }

  getReceiverId(): string {
    if (this.authService.getCurrentUser() == 'kcA4QLnAfvcBnaxExxlmKqw1KIu2'){
      return 'gEPooI5KujMcg8QMChAU32qh2ql1'
    }
    return 'kcA4QLnAfvcBnaxExxlmKqw1KIu2';
  }
}
