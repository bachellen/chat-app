import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  @Output() userSelected = new EventEmitter<{ id: string, name: string, online: boolean }>();

  users = [
    { id: 'gEPooI5KujMcg8QMChAU32qh2ql1', name: 'Muhailah', online: true },
    { id: 'kcA4QLnAfvcBnaxExxlmKqw1KIu2', name: 'Atheer', online: false },
    { id: 'Cq9vMZb8dfOqfHeZJy08SCPi7Fg1', name: 'Reem', online: true },
    // Add more users as needed
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  selectUser(user: any): void {
    this.userSelected.emit(user);
  }

  logout(): void {
    this.authService.logout();
    // Implement further logout logic if needed, e.g., redirect to login page
  }
}