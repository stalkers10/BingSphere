import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class AuthComponent {
  isLogin = true;
  username = '';
  password = '';
  email = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.isLogin) {
      this.auth.login({ username: this.username, password: this.password }).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => alert('Login Failed')
      });
    } else {
      this.auth.register({ username: this.username, password: this.password, email: this.email }).subscribe({
        next: () => { alert('Success! Now please login.'); this.isLogin = true; },
        error: () => alert('Registration Failed')
      });
    }
  }
}
