import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CardElevacaoPadraoComponent } from '../card-elevacao-padrao/card-elevacao-padrao.component';
import { Post } from '../../types/post.schemas';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { PostService } from '../../../services/post.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    RouterModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  @Output() postExcluido = new EventEmitter<number>();
  usuarioLogadoId: number | null = null;
  excluindoPost = false;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private postService: PostService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog
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
    this.abrirDialogConfirmacao();
  }

  abrirDialogConfirmacao(): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '350px',
      data: {
        titulo: 'Excluir Post',
        mensagem: 'Tem certeza que deseja excluir este post?',
        botaoConfirmarTexto: 'Excluir',
        botaoCancelarTexto: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmacao => {
      if (confirmacao && this.post.id) {
        this.excluirPost(this.post.id);
      }
    });
  }

  async excluirPost(postId: number): Promise<void> {
    try {
      this.excluindoPost = true;
      await this.postService.deletePost(postId);
      this.snackBarService.exibirMensagemSucesso('Post excluído com sucesso');
      this.postExcluido.emit(postId);
    } catch (error) {
      this.snackBarService.exibirMensagemErro('Não foi possível excluir o post. Tente novamente mais tarde.');
    } finally {
      this.excluindoPost = false;
    }
  }
} 