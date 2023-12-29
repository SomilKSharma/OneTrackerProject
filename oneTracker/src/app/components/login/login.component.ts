import { Component} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2000ms', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}
  onSubmit() {
    if (this.username && this.password) {
      this.login();
    }
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(response => {
      // Handle successful login (navigate, display a message, etc.)
      console.log('Login successful');
    }, error => {
      // Handle login failure (display an error message, etc.)
      console.error('Login failed');
    });
  }
}
