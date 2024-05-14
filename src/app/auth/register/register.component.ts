import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../generalservices/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  displayName: string = '';

  constructor(private authService: AuthService, private router:Router,private notificationService:NotificationService) {}

  // register() {
  //   this.authService.register(this.email, this.password, this.displayName).subscribe({
  //     next: (response) => {
  //       console.log('Registration successful', response);
  //       this.notificationService.show('Registration successful!');
  //       this.router.navigate(['/login']);  // Navigate to chat or dashboard
  //     },
  //     error: (error) => {
  //       console.error('Registration failed', error);
  //       this.notificationService.show('Registration failed: ' + error.error.message);
  //     }
      
  //   });
  // }
}


