import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Student } from '../models/student';
import { RouterLink } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  studentList:Student[] = [];
  userList:User[] = [];
  constructor(private userService:UserService){}

  ngOnInit(){
    this.userService.getStudents().subscribe(res => {
      this.studentList = res;
      console.log(this.studentList)
    })
  }
}
