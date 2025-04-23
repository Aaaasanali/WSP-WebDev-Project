import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-creator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-creator.component.html',
  styleUrl: './user-creator.component.css'
})
export class UserCreatorComponent {
  user = {
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: true,
    role: '',
    studentInfo: {
      gpa: null,
      major: '',
    },
    teacherInfo: {
      salary: null,
    }
  };
  constructor(private http: HttpClient, private userService:UserService) {}

  submit() {
    const body: any = {
      username: this.user.username,
      password: this.user.password,
      email: this.user.email,
      phone: this.user.phone,
      gender: this.user.gender,
      is_student: this.user.role === 'student',
      is_teacher: this.user.role === 'teacher',
    };

    if (this.user.role === 'student') {
      body.student = {
        gpa: this.user.studentInfo.gpa,
        major: this.user.studentInfo.major,
      };
    }

    if (this.user.role === 'teacher') {
      body.teacher = {
        salary: this.user.teacherInfo.salary
      };
    }
    console.log(this.user.role);
    this.userService.createUser(body).subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
    });
    console.log(this.user);
    this.user = {
      username: '',
      password: '',
      email: '',
      phone: '',
      gender: true,
      role: '',
      studentInfo: {
        gpa: null,
        major: '',
      },
      teacherInfo: {
        salary: null,
      }
    };
  }
}
