import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API_POSTAGENS = 'http://localhost:8080/api/postagens';

  constructor(private http: HttpClient) { }

  async getAllPosts(): Promise<Post[]> {
    return lastValueFrom(this.http.get<Post[]>(this.API_POSTAGENS));
  }

  async getUserPosts(): Promise<Post[]> {
    return lastValueFrom(this.http.get<Post[]>(`${this.API_POSTAGENS}/usuario-logado`));
  }

  async createPost(post: Post): Promise<Post> {
    return lastValueFrom(this.http.post<Post>(this.API_POSTAGENS, post));
  }

  async updatePost(id: number, post: Post): Promise<Post> {
    return lastValueFrom(this.http.put<Post>(`${this.API_POSTAGENS}/${id}`, post));
  }

  async deletePost(id: number): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.API_POSTAGENS}/${id}`));
  }
} 