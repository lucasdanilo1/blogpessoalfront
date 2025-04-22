import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Usuario } from '../shared/types/usuario.schemas';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly API = `${environment.apiUrl}/api/usuarios`;

  constructor(private http: HttpClient) {}

  async getUsuarioById(id: number): Promise<Usuario> {
    return lastValueFrom(this.http.get<Usuario>(`${this.API}/${id}`));
  }

  async atualizarUsuario(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    return lastValueFrom(this.http.patch<Usuario>(`${this.API}/${id}`, usuario));
  }

  async uploadFoto(id: number, arquivo: File): Promise<any> {
    const formData = new FormData();
    formData.append('foto', arquivo, arquivo.name);
    
    const headers = new HttpHeaders();
    // Não definimos o Content-Type aqui para que o navegador defina automaticamente 
    // o boundary correto para a requisição multipart/form-data
    
    return lastValueFrom(
      this.http.patch(
        `${this.API}/foto/${id}`, 
        formData,
        { headers }
      )
    );
  }

  parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Erro ao decodificar token JWT:', e);
      return null;
    }
  }

  extrairIdDoUsuarioDoToken(token: string): number | null {
    try {
      const tokenDecodificado = this.parseJwt(token);
      if (tokenDecodificado && tokenDecodificado.id) {
        return tokenDecodificado.id;
      }
      return null;
    } catch (erro) {
      console.error('Erro ao extrair ID do usuário do token:', erro);
      return null;
    }
  }

  // Retorna uma foto mockada baseada no ID do usuário para garantir consistência
  getFotoMockada(userId: number): string {
    // Array de URLs de avatares mockados
    const avatares = [
      'https://randomuser.me/api/portraits/men/1.jpg',
      'https://randomuser.me/api/portraits/women/2.jpg',
      'https://randomuser.me/api/portraits/men/3.jpg',
      'https://randomuser.me/api/portraits/women/4.jpg',
      'https://randomuser.me/api/portraits/men/5.jpg',
      'https://randomuser.me/api/portraits/women/6.jpg',
      'https://randomuser.me/api/portraits/men/7.jpg',
      'https://randomuser.me/api/portraits/women/8.jpg'
    ];
    
    // Uso o ID do usuário para selecionar sempre o mesmo avatar para o mesmo usuário
    const indice = userId % avatares.length;
    return avatares[indice];
  }
} 