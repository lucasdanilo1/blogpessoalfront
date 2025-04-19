import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, UsuarioLogin } from '../shared/components/types/usuario.schemas';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(usuarioLogin: UsuarioLogin): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/auth/login`, usuarioLogin)
      .pipe(
        tap((response: Usuario) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('usuario', JSON.stringify(response));
          }
        })
      );
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/auth/registrar`, usuario);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuario(): Usuario | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
} 