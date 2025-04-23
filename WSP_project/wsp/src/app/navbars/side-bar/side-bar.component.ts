import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  user?: User;

  constructor(private userService:UserService){}

  ngOnInit():void{
    this.userService.getCurrentUser().subscribe({
      next: data => this.user = data,
      error: err => console.error('Error fetching users:', err)
    });
    
  }
}
