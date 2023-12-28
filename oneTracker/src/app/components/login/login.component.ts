import { Component} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'; 


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

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}
  onSubmit() {
    if (this.username && this.password) {
      this.login();
    }
  }

  login() {
    const loginData = { username: this.username, password: this.password };

    this.http.post<any>('http://localhost:3000/login', loginData).subscribe(
      (response) => {
        // Assuming the server returns a token in the 'token' property
        const token = response.token;

        // Store the token in your AuthService
        this.authService.setToken(token);

        // Redirect to the dashboard or any desired route
        this.router.navigate(['/dashboard/viewalltickets']);
      },
      (error) => {
        // Handle login error, show a message, etc.
        console.error('Login failed:', error);
      }
    );
  }
}
