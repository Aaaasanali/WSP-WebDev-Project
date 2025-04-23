import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  tokenExpired$: Subject<boolean> = new Subject<boolean>();

  baseUrl:string = 'http://localhost:8000/api/';

  constructor(private http:HttpClient, private router:Router){}

  getCurrentUser(){
    return this.http.get<User>(`${this.baseUrl}current-user/`);
  }

  getUsers(){
    return this.http.get<User[]>(`${this.baseUrl}users/`);
  }

  getUserById(id?:number){
    return this.http.get<User>(`${this.baseUrl}users/${id}`)
  }

  updateEmail(newEmail:string){
    const body = { email: newEmail };
    return this.http.put(`${this.baseUrl}update_email/`, body);
  }

  updatePhone(newPhone:string){
    const body = { phone: newPhone}
    return this.http.put(`${this.baseUrl}update_phone/`, body);
  }

  updatePic(newPicURL:string){
    const body = { url: newPicURL}
    return this.http.put(`${this.baseUrl}update_pic/`, body);
  }

  refreshToken() {
    const refresh = localStorage.getItem('refresh_token');
    return this.http.post<{ access: string }>('/api/token/refresh/', { refresh });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token'); 
    this.router.navigate(['']);
  }

  createUser(payload:Object){
    return this.http.post(`${this.baseUrl}create_user`, payload);
  }
  deleteUser(id:number){
    return this.http.delete(`${this.baseUrl}users/${id}/delete`)
  }

  getStudentById(id:number){
    return this.http.get<Student>(`${this.baseUrl}users/students/${id}`)
  }
  getTeacherById(id:number){
    return this.http.get<Teacher>(`${this.baseUrl}users/teachers/${id}`)
  }

  getStudents(){
    return this.http.get<Student[]>(`${this.baseUrl}users/students`)
  }
}
