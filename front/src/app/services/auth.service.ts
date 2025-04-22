import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroUsuario, Usuario, UsuarioLogin } from '../shared/types/usuario.schemas';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { LoginResponseDTO } from '../shared/types/login-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(usuarioLogin: UsuarioLogin): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/auth/login`, usuarioLogin)
      .pipe(
        tap((response: LoginResponseDTO) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('usuario', JSON.stringify(response));
          }
        })
      );
  }

  cadastrar(usuario: CadastroUsuario): Observable<Usuario> {
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