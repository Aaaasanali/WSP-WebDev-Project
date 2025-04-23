import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-users-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-users-list.component.html',
  styleUrl: './admin-users-list.component.css'
})
export class AdminUsersListComponent {
  usersList:User[] = [];
  currUser?:User;
  constructor(private userService:UserService){}

  ngOnInit():void{
    this.userService.getUsers().subscribe(res => {
      this.usersList = res;
    })
    this.userService.getCurrentUser().subscribe(res => {
      this.currUser = res;
    })
  }

  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
    })
    this.usersList = this.usersList.filter(item => +item.id !== id);
  }
}
