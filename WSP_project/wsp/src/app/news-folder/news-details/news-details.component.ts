import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { NewsItem } from '../../models/news-item';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent {
  id?:number;
  news?:NewsItem;
  user?:User;
  newsObj: any = null;
  constructor(private newsService:NewsService, private userService:UserService, private route:ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe((params)=>{
      this.id = params['id'];
    })
    this.newsService.getNewsById(this.id).subscribe(data => {
      this.news=data;
      this.newsObj = data;
    })
    console.log(this.news?.author)
  }

  edit:boolean=false;
  editShow(){
    this.edit=!this.edit;
  }

  saveEdits(){
    this.newsService.updateNews(this.newsObj).subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
    })
  }
}
