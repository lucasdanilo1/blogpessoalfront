import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DefaultButtonComponent } from '../../shared/components/default-button/default-button.component';
import { Post, FiltrosPostagemDTO } from '../../shared/types/post.schemas';
import { PostFormPopUpComponent } from '../../shared/components/post-form-popup/post-form-popup.component';
import { PostListaComponent } from '../../shared/components/posts-lista/post-lista.component';
import { TemaService } from '../../services/tema.service';
import { Tema } from '../../shared/types/tema.schemas';
import { SnackBarService } from '../../services/snackbar.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-meus-posts',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    DefaultButtonComponent,
    PostListaComponent,
  ],
  templateUrl: './meus-posts.component.html',
  styleUrls: ['./meus-posts.component.scss']
})
export class MeusPostsComponent implements OnInit {
  temas: Tema[] = [];
  @ViewChild(PostListaComponent) postLista!: PostListaComponent;
  
  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
    private temaService: TemaService
  ) { }

  ngOnInit(): void {
    this.carregarTemas();
  }

  async carregarTemas(): Promise<void> {
    try {
      this.temas = await this.temaService.getTemas();
    } catch (error) {
      this.snackBarService.exibirMensagemErro('Não foi possível carregar os temas.');
    }
  }

  getUsuarioId(): number {
    const token = this.authService.getToken();
    if (token) {
      const userId = this.usuarioService.extrairIdDoUsuarioDoToken(token);
      if (userId !== null) {
        return userId;
      }
    }
    return 0;
  }

  abrirFormularioPost(): void {
    const dialogRef = this.dialog.open(PostFormPopUpComponent, {
      width: '600px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.postLista) {
          this.postLista.carregarPosts();
        }
      }
    });
  }
}
