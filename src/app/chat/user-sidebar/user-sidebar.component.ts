import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ChatService } from '../chat.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  @Output() userSelected = new EventEmitter<{ id: string, name: string, online: boolean }>();

  users: any[] = [];
  private presenceSubscription!: Subscription;


  constructor(private authService: AuthService,private chatService: ChatService) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.presenceSubscription = this.chatService.tUsersPresence.subscribe(update => {
      this.updateUserPresence(update);
    });
  }

  ngOnDestroy(): void {
    if (this.presenceSubscription) {
      this.presenceSubscription.unsubscribe();
    }
  }

  fetchUsers(): void {
    this.chatService.getUsers().subscribe(response => {
      if (response && response.users) {
        this.users = response.users.map( (user: { user_id: any; displayName: any; status: any; }) => ({
          id: user.user_id,  // Ensure this matches your Firestore field
          name: user.displayName,
          online: user.status === 'Online'
        }));
      }
    });
  }
  private updateUserPresence(update: { user_id: string, status: string }): void {
    const user = this.users.find(u => u.id === update.user_id);
    if (user) {
      user.online = update.status === 'Online';
    }
  }

  selectUser(user: any): void {
    this.userSelected.emit({id: user.id, name : user.name, online: user.online});
  }

  logout(): void {
    this.authService.logout();
  }
}