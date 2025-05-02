import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from '../../types/post.schemas';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { PostService } from '../../../services/post.service';
import { SnackBarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  @Output() postExcluido = new EventEmitter<number>();
  usuarioLogadoId: number | null = null;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private postService: PostService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.verificarUsuarioLogado();
  }

  verificarUsuarioLogado(): void {
    const token = this.authService.getToken();
    if (token) {
      this.usuarioLogadoId = this.usuarioService.extrairIdDoUsuarioDoToken(token);
    }
  }

  podeExcluirPost(): boolean {
    return this.usuarioLogadoId !== null && this.post.usuario && this.usuarioLogadoId === this.post.usuario.id;
  }

  onDelete(): void {
    if (this.post.id) {
      this.excluirPost(this.post.id);
    }
  }

  async excluirPost(postId: number): Promise<void> {
    try {
      await this.postService.deletePost(postId);
      this.snackBarService.exibirMensagemSucesso('Post excluído com sucesso');
      this.postExcluido.emit(postId);
    } catch (error) {
      this.snackBarService.exibirMensagemErro('Não foi possível excluir o post. Tente novamente mais tarde.');
    }
  }
}
