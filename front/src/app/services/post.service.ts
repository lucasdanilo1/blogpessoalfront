import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { FiltrosPostagemDTO, Post } from '../shared/types/post.schemas';
import { Page, MinifiedPageable } from '../shared/types/page';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API_POSTAGENS = 'http://localhost:8080/api/postagens';

  constructor(private http: HttpClient) { }

  getPosts(filtros: FiltrosPostagemDTO, pageable?: MinifiedPageable): Observable<Page<Post>> {
    let params = new HttpParams()
      .set('sort', 'data,desc');

    if (pageable) {
      params = params
        .set('page', pageable.page.toString())
        .set('size', pageable.size.toString());
    }

    return this.http.post<Page<Post>>(`${this.API_POSTAGENS}/listagem`, filtros, { params });
  }

  async getUltimosPosts(): Promise<Post[]> {
    const response = await lastValueFrom(
      this.http.get<Post[]>(`${this.API_POSTAGENS}/listagem/recentes`)
    );
    return response;
  }

  async getPostsDoUsuarioLogado(pageable?: MinifiedPageable): Promise<Page<Post>> {
    let params = new HttpParams();
    
    if (pageable) {
      params = params
        .set('page', pageable.page.toString())
        .set('size', pageable.size.toString());
    }
    
    return lastValueFrom(
      this.http.get<Page<Post>>(`${this.API_POSTAGENS}/listagem/usuario-logado`, { params })
    );
  }

  async getPostById(id: number): Promise<Post> {
    return lastValueFrom(this.http.get<Post>(`${this.API_POSTAGENS}/${id}`));
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

  async getPostsPorDiaDaSemana(): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${this.API_POSTAGENS}/posts-por-dia`));
  }
} 