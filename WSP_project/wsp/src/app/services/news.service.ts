import { Injectable } from '@angular/core';
import { NewsItem } from '../models/news-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  baseUrl:string = 'http://localhost:8000/api/';

  constructor(private http:HttpClient) { }

  createNews(news:Object){
    return this.http.post(`${this.baseUrl}create_news`, news);
  }

  getAllNews(){
    return this.http.get<NewsItem[]>(`${this.baseUrl}get_news`);
  }

  deleteNews(id:number){
    return this.http.delete(`${this.baseUrl}news/${id}/delete`)
  }

  getNewsById(id?:number){
    return this.http.get<NewsItem>(`${this.baseUrl}news/${id}`);
  }

  updateNews(body:NewsItem){
    return this.http.put(`${this.baseUrl}news/${body.id}/update`, body);
  }

  
}
