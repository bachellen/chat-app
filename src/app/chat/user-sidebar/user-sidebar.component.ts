import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  onlineUsers = [{ name: 'User 1' }, { name: 'User 2' }];
  offlineUsers = [{ name: 'User 3' }, { name: 'User 4' }];

  constructor() {}

  ngOnInit(): void {}
}
