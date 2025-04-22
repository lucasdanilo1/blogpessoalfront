import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { PostListaComponent } from '../../shared/components/posts-lista/post-lista.component';
import { TemaService } from '../../services/tema.service';
import { Tema } from '../../shared/types/tema.schemas';
import { SnackBarService } from '../../services/snackbar.service';
import { FiltrosPostagemDTO } from '../../shared/types/post.schemas';
import { FiltrosPostComponent } from '../../shared/components/filtros-post/filtros-post.component';

@Component({
  selector: 'app-todos-posts',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    PostListaComponent,
    FiltrosPostComponent
  ],
  templateUrl: './todos-posts.component.html',
  styleUrls: ['./todos-posts.component.scss']
})
export class TodosPostsComponent implements OnInit {

  filtros: FiltrosPostagemDTO = {};
  temas: Tema[] = [];

  constructor(
    private temaService: TemaService,
    private snackBarService: SnackBarService
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

  onFiltrosChange(novosFiltros: FiltrosPostagemDTO): void {
    this.filtros = novosFiltros;
  }
} 