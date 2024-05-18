import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../chat.service';
import { Message, SendMessageEvent, User } from '@progress/kendo-angular-conversational-ui';
import { ChangeDetectorRef } from '@angular/core';
import { Observable, interval, map, scan } from 'rxjs';



@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  messages: Message[] =[];
  // responses : Message[];
  currentUser: any;
  chatUser : User =  {
    id: this.getReceiverId()
  }

  constructor(private authService: AuthService, private chatService: ChatService, private cdr: ChangeDetectorRef) {
    this.currentUser = this.authService.getCurrentUser();

    this.messages =  [...this.messages]


    
  }

  ngOnInit(): void {
this.loadMessages()  }

  loadMessages()  {
    let index= 0
    this.chatService.getMessages().subscribe((data) => {
      console.log(data.messages)
      console.log(data.messages.length)
      let responses = data.messages
      for ( index = 0 ; index < data.messages.length; index++) {
      
        this.messages =  [...this.messages, {text:responses[index].message.text, author: this.chatUser}]} 
    });
    // console.log(index)
    // for (let i = 0 ; i< index; i++){
    //   this.messages =  [...this.messages, {text:"hello", author: this.chatUser}]} 
    //   });
  

    }
  sendMessage(e: SendMessageEvent, flag: boolean=false): void {
    console.log(e.message.text)
    const messageText = e.message;
    const message = {
      'message': messageText,
      'receiver_id': this.getReceiverId(), // Implement getReceiverId based on your logic
    };
    this.messages = [...this.messages, e.message];
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
    if (this.authService.getCurrentUser() == 'kcA4QLnAfvcBnaxExxlmKqw1KIu2'){
      return 'gEPooI5KujMcg8QMChAU32qh2ql1'
    }
    return 'kcA4QLnAfvcBnaxExxlmKqw1KIu2';
  } 
}

function messageData(): void {
  throw new Error('Function not implemented.');
}
