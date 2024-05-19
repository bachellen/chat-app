import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Message } from '@progress/kendo-angular-conversational-ui';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements AfterViewInit {
  tabs: { id: string, name: string, online: boolean }[] = [];
  selectedTab: string | null = null;
  userMessages: Map<string, Message[]> = new Map();

  constructor(private authService: AuthService, private chatService: ChatService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // Initial change detection after the view is initialized
    this.cdr.detectChanges();
  }

  onUserSelected(user: { id: string, name: string, online: boolean }): void {
    if (!this.tabs.find(tab => tab.id === user.id)) {
      this.tabs.push(user);
    }
    console.log("tabs",this.tabs)
    this.selectedTab = user.id;
    if (!this.userMessages.has(user.id)) {
      this.userMessages.set(user.id, []);
    }
    this.loadMessagesForSelectedTab();
    this.cdr.detectChanges(); // Trigger change detection
  }

  closeTab(tabId: string, event: MouseEvent): void {
    event.stopPropagation(); // Prevent event bubbling to avoid selecting the tab
    this.tabs = this.tabs.filter(tab => tab.id !== tabId);
    if (this.selectedTab === tabId) {
      this.selectedTab = this.tabs.length > 0 ? this.tabs[0].id : null;
    }
    this.cdr.detectChanges(); // Trigger change detection
  }

  getMessagesForSelectedTab(): Message[] {
    return this.userMessages.get(this.selectedTab!) || [];
  }

  addMessageToSelectedTab(message: Message): void {
    if (this.selectedTab) {
      let messages = this.userMessages.get(this.selectedTab) || [];
      if (!messages.some(msg => msg.text === message.text && msg.author.id === message.author.id && msg.timestamp === message.timestamp)) {
        messages = [...messages, message];
        this.userMessages.set(this.selectedTab, messages);
        this.cdr.detectChanges(); // Trigger change detection
      }
    }
  }

  updateMessagesForUser(userId: string, messages: Message[]): void {
    this.userMessages.set(userId, messages);
    if (this.selectedTab === userId) {
      this.selectedTab = null; // Trigger change detection
      this.cdr.detectChanges();
      setTimeout(() => {
        this.selectedTab = userId;
        this.cdr.detectChanges(); // Trigger change detection
      });
    }
  }

  loadMessagesForSelectedTab(): void {
    if (this.selectedTab) {
      const receiverId = this.selectedTab;
      this.chatService.getMessagesForUser(receiverId).subscribe((data) => {
        const messages = data.messages.map((msg: any) => ({
          text: msg.message.text,
          author: msg.sender_id === this.authService.getCurrentUser() ? { id: this.authService.getCurrentUser() } : { id: receiverId },
          timestamp: new Date(msg.message.timestamp)
        }));
        this.updateMessagesForUser(receiverId, messages);
      });
    }
  }
}