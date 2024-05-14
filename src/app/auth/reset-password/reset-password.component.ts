import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationService } from '../../generalservices/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService, private notificationService:NotificationService) {}

  // resetPassword() {
  //   this.authService.resetPassword(this.email).subscribe({
  //     next: () => {
  //       console.log('Reset password link sent.');
  //       this.notificationService.show('Reset password link sent. Check your email.');
  //     },
  //     error: (error) => {
  //       console.error('Error sending reset password link', error);
  //       this.notificationService.show('Error: ' + error.error.message);
  //     }
  //   });
  // }
}
