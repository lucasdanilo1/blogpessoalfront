import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusPostsComponent } from '../meus-posts/meus-posts.component';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../shared/types/usuario.schemas';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DefaultButtonComponent } from '../../shared/components/default-button/default-button.component';
import { CardElevacaoPadraoComponent } from "../../shared/components/card-elevacao-padrao/card-elevacao-padrao.component";

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MeusPostsComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    DefaultButtonComponent,
    CardElevacaoPadraoComponent
],
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.scss']
})
export class MeuPerfilComponent implements OnInit {
  usuario: Usuario | undefined;
  perfilForm: FormGroup;
  editandoPerfil = false;
  arquivoSelecionado: File | null = null;
  fotoPreview: string | ArrayBuffer | null = null;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.perfilForm = this.fb.group({
      nome: ['', Validators.required],
      bio: ['']
    });
  }

  ngOnInit(): void {
    this.carregarDadosUsuario();
  }

  async carregarDadosUsuario(): Promise<void> {
    const token = this.authService.getToken();
    const userId = this.usuarioService.extrairIdDoUsuarioDoToken(token!);
    const usuario = await this.usuarioService.getUsuarioById(userId!);

    if (usuario) {
      this.usuario = {
        ...usuario,
        id: usuario.id || 0,
        nome: usuario.nome || '',
        foto: usuario.foto || '',
        bio: usuario.bio || 'Nada por aqui ainda.'
      };

      this.perfilForm.patchValue({
        nome: this.usuario.nome,
        bio: this.usuario.bio || ''
      });
    }
  }

  habilitarEdicao(): void {
    this.editandoPerfil = true;
  }

  cancelarEdicao(): void {
    this.editandoPerfil = false;
    this.arquivoSelecionado = null;
    this.fotoPreview = null;
    this.perfilForm.patchValue({
      nome: this.usuario?.nome || '',
      bio: this.usuario?.bio || ''
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.arquivoSelecionado = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPreview = reader.result;
      };
      reader.readAsDataURL(this.arquivoSelecionado);
    }
  }

  async salvarPerfil(): Promise<void> {
    if (this.perfilForm.invalid) {
      return;
    }

    if (!this.usuario?.id) {
      return;
    }

    try {
      const dadosAtualizados = this.perfilForm.value;
      await this.usuarioService.atualizarUsuario(this.usuario.id, dadosAtualizados);

      if (this.arquivoSelecionado) {
        await this.usuarioService.uploadFoto(this.usuario.id, this.arquivoSelecionado);
      }

      await this.carregarDadosUsuario();

      window.location.reload();

      this.editandoPerfil = false;
      this.arquivoSelecionado = null;
      this.fotoPreview = null;
    } catch (erro) {
      console.error('Erro ao atualizar perfil:', erro);
    }
  }
}
