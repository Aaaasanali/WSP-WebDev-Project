import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route } from '@angular/router';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  currUser?:User;
  user?:User;
  id?:number;
  stud?:Student;
  teacher?:Teacher;
  isStudent: boolean = false;
  isTeacher:boolean = false;
  constructor(private userService:UserService, private http: HttpClient, private route:ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe((params)=>{
      this.id = params['id'];
    })
    this.userService.getCurrentUser().subscribe({
      next: data => this.currUser = data,
      error: err => console.error('Error fetching users:', err)
    });
    this.userService.getUserById(this.id).subscribe({
      next: data => {
        this.user = data;
        this.isStudent = this.user?.is_student === true;
        this.isTeacher = this.user?.is_teacher === true;
        if (this.isStudent) {
          this.userService.getStudentById(this.user.id).subscribe({
            next: (res) => {
              this.stud = res;
            },
            error: (err) => {
              console.error(err);
            }
          });
        }
        else if(this.isTeacher){
          this.userService.getTeacherById(this.user.id).subscribe({
            next: (res) => {
              this.teacher = res;
            },
            error: (err) => {
              console.error(err);
            }
          });
        }
      },
      error: err => console.error('Error fetching users:', err)
    });

  
  };


  show_email:boolean = false;
  show_phone:boolean = false;
  show_picture:boolean = false;
  show(element:string){
    switch(element){
      case 'email':
        this.show_email = !this.show_email;
        break;
      case 'phone':
        this.show_phone = !this.show_phone;
        break;
      case 'pic':
        this.show_picture = !this.show_picture;
    }
  }

  newEmail: string = '';
  changeEmail() {

    this.userService.updateEmail(this.newEmail).subscribe({
      next: (res) => console.log('Email updated:', res),
      error: (err) => console.error('Update failed:', err),
    });
    this.show_email = false;
  }

  newPhone: string = '';
  changePhone() {

    this.userService.updatePhone(this.newPhone).subscribe({
      next: (res) => console.log('Phone number updated:', res),
      error: (err) => console.error('Update failed:', err),
    });
    this.show_phone = false;
  }

  newPicURL: string = '';
  changePic(){
    this.userService.updatePic(this.newPicURL).subscribe({
      next: (res) => console.log('Profile picture updated:', res),
      error: (err) => console.error('Update failed:', err),
    });
    this.show_phone = false;
  }

}