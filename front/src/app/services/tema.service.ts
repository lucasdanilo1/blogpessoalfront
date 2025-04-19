import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, of } from 'rxjs';
import { Tema } from '../shared/components/types/tema.schemas';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  private readonly API = 'http://localhost:8080/api/temas';

  constructor(private http: HttpClient) {}

  async getAllTemas(): Promise<Tema[]> {
    return lastValueFrom(this.http.get<Tema[]>(this.API));
  }

  async getTemaById(id: number): Promise<Tema | undefined> {
    return lastValueFrom(this.http.get<Tema>(`${this.API}/${id}`));
  }
}
