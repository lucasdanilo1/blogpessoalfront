import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, of } from 'rxjs';
import { Tema } from '../models/tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private readonly API = 'http://localhost:8080/temas';
  
  // Mock de temas para desenvolvimento
  private temasMock: Tema[] = [
    { id: 1, nome: 'Tecnologia', descricao: 'Assuntos relacionados à tecnologia' },
    { id: 2, nome: 'Saúde', descricao: 'Assuntos relacionados à saúde' },
    { id: 3, nome: 'Educação', descricao: 'Assuntos relacionados à educação' },
    { id: 4, nome: 'Entretenimento', descricao: 'Assuntos relacionados ao entretenimento' }
  ];

  constructor(private http: HttpClient) { }

  async getAllTemas(): Promise<Tema[]> {
    try {
      // Tenta buscar do backend
      return lastValueFrom(this.http.get<Tema[]>(this.API));
    } catch (error) {
      // Em caso de erro, usa os dados mockados
      return of(this.temasMock).toPromise() as Promise<Tema[]>;
    }
  }

  async getTemaById(id: number): Promise<Tema | undefined> {
    try {
      return lastValueFrom(this.http.get<Tema>(`${this.API}/${id}`));
    } catch (error) {
      return of(this.temasMock.find(tema => tema.id === id)).toPromise() as Promise<Tema | undefined>;
    }
  }
} 