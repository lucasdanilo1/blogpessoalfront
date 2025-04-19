import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FiltrosPostagemDTO, Post } from '../shared/components/types/post.schemas';
import { Page } from '../shared/components/types/page';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API_POSTAGENS = 'http://localhost:8080/api/postagens';

  constructor(private http: HttpClient) { }

  async getUltimosPosts(filtros: FiltrosPostagemDTO): Promise<Post[]> {
    let params = new HttpParams()
      .set('page', '0')
      .set('size', '10')
      .set('sort', 'data,asc');

    const response = await lastValueFrom(
      this.http.post<Page<Post>>(`${this.API_POSTAGENS}/listagem`, {
        params,
        body: filtros
      })
    );

    return response.content;
  }

  async getUserPosts(): Promise<Post[]> {
      const response = await lastValueFrom(this.http.get<Page<Post>>(`${this.API_POSTAGENS}/listagem/usuario-logado`));
      return response.content;
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