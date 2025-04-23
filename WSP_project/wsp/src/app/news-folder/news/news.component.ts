import { Component, inject } from '@angular/core';
import { NewsItem } from '../../models/news-item';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  news = {
    title: '',
    description: '',
    image: '',
    content: '',
  };
  newsList:NewsItem[] = []
  currUser?:User;
  constructor(private newsService:NewsService, private userService:UserService){}

  private getNewsList(){
    this.newsService.getAllNews().subscribe(data => {
      this.newsList = data;
    })
  }

  ngOnInit(){
    this.getNewsList();
    this.userService.getCurrentUser().subscribe(us => {
      this.currUser=us;
    })
  }
  submitNews(){
    this.newsService.createNews(this.news).subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
    })
    this.getNewsList();
  }
  deleteNews(id:number){
    this.newsService.deleteNews(id).subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
    })
    this.newsList = this.newsList.filter(item => item.id !== id);
  }

  editNews:boolean=false;
  editNewsFlag(){
    this.editNews = !this.editNews;
  }
}
