import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CardElevacaoPadraoComponent } from '../card-elevacao-padrao/card-elevacao-padrao.component';
import { PostService } from '../../../services/post.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { Post, FiltrosPostagemDTO } from '../../types/post.schemas';
import { PostItemComponent } from '../post-item/post-item.component';
import { MinifiedPageable } from '../../types/page';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-post-lista',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    PostItemComponent,
    CardElevacaoPadraoComponent
  ],
  templateUrl: './post-lista.component.html',
  styleUrls: ['./post-lista.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostListaComponent implements OnInit, OnChanges {
  @Input() filtros: FiltrosPostagemDTO = {};
  posts: Post[] = [];
  
  pageSize = 3;
  pageIndex = 0;
  totalPosts = 0;

  constructor(
    private postService: PostService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.carregarPosts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filtros']) {
      this.pageIndex = 0;
      this.carregarPosts();
    }
  }

  carregarPosts(): void {
    const pageable: MinifiedPageable = {
      page: this.pageIndex,
      size: this.pageSize
    };

    console.log(this.filtros);

    this.postService.getPosts(this.filtros, pageable)
      .pipe(
        tap(response => {
          this.posts = response.content;
          this.totalPosts = response.totalElements;
        }),
        catchError(() => {
          this.snackBarService.exibirMensagemErro('Não foi possível carregar os posts. Tente novamente mais tarde.', 'Fechar', {
            duration: 5000
          });
          return of(null);
        })
      )
      .subscribe();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarPosts();
  }
  
  onPostExcluido(): void {
    this.carregarPosts();
  }
} 