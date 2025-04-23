import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  username = '';
  password = '';

  constructor(private router: Router, private http: HttpClient){}

  login() {
    const credentials = {
      username: this.username,
      password: this.password,
    };

    this.http.post('http://localhost:8000/api/token/', credentials)
      .subscribe({
        next: (res: any) => {
          console.log('Token received:', res);
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
          this.router.navigate(['/home'])
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
  }
}
