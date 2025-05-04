import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, of } from 'rxjs';
import { Tema, TemaPostagemDTO } from '../shared/types/tema.schemas';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TemaService {

  private readonly API = `${environment.apiUrl}/api/temas`;

  constructor(private http: HttpClient) {}

  async getTemas(): Promise<Tema[]> {
    return lastValueFrom(this.http.get<Tema[]>(this.API));
  }

  async getTemaById(id: number): Promise<Tema | undefined> {
    return lastValueFrom(this.http.get<Tema>(`${this.API}/${id}`));
  }

  async criarTema(tema: Tema): Promise<Tema> {
    return lastValueFrom(this.http.post<Tema>(this.API, tema));
  }

  async getPostsPorTema(): Promise<TemaPostagemDTO[]> {
    try {
      return await lastValueFrom(this.http.get<TemaPostagemDTO[]>(`${this.API}/contagem-postagens`));
    } catch (error) {
      console.error('Erro ao obter contagem de postagens por tema:', error);
      return [];
    }
  }
}
