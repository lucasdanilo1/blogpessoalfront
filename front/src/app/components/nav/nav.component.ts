import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../shared/types/usuario.schemas';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  usuario: Usuario | null = null;
  isLoggedIn = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.verificarLoginStatus();
  }

  async verificarLoginStatus(): Promise<void> {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    if (this.isLoggedIn) {
      // Obter informações básicas do usuário
      this.usuario = this.authService.getUsuario();
      
      // Tentar obter informações completas, incluindo a foto
      const token = this.authService.getToken();
      if (token) {
        const userId = this.usuarioService.extrairIdDoUsuarioDoToken(token);
        if (userId) {
          try {
            const usuarioCompleto = await this.usuarioService.getUsuarioById(userId);
            this.usuario = {
              ...this.usuario,
              id: usuarioCompleto.id,
              nome: usuarioCompleto.nome,
              foto: usuarioCompleto.foto
            };
          } catch (error) {
            console.error('Erro ao obter dados completos do usuário:', error);
          }
        }
      }
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
} 