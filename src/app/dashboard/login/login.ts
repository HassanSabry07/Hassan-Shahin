import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  router = inject(Router);
  http   = inject(HttpClient);

  url = 'http://localhost:3000/api/auth/login';

  credentials = { username: '', password: '' };
  errorMsg  = '';
  isLoading = false;
  showPass  = false;

  login() {
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMsg = 'Please fill in all fields.';
      return;
    }

    this.isLoading = true;
    this.errorMsg  = '';

    this.http.post<any>(this.url, this.credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isLoading = false;
        this.errorMsg  = 'Invalid username or password.';
      }
    });
  }

  // ✅ ضغط Enter يعمل login
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') this.login();
  }
}