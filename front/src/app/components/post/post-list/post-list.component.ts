import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostItemComponent } from '../post-item/post-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CardElevacaoPadraoComponent } from '../../../shared/components/card-elevacao-padrao.component';
import { PostService } from '../../../services/post.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { Post } from '../../../shared/components/types/post.schemas';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSnackBarModule,
    PostItemComponent,
    CardElevacaoPadraoComponent
  ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  @Output() postExcluido = new EventEmitter<number>();

  constructor(
    private postService: PostService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  adicionarNovoPost(post: Post): void {
    this.posts.push(post);
  }

  async loadPosts(): Promise<void> {
    try {

      this.posts = await this.postService.getUltimosPosts({});
    } catch (error) {
      this.snackBarService.exibirMensagemErro('Não foi possível carregar os posts. Tente novamente mais tarde.');
    }
  }

  async onDeletePost(id: number): Promise<void> {
    if (id) {
      try {
        await this.postService.deletePost(id);
        this.posts = this.posts.filter(post => post.id !== id);
        this.snackBarService.exibirMensagemSucesso('Post excluído com sucesso!');
        this.postExcluido.emit(id);
      } catch (error) {
        this.snackBarService.exibirMensagemErro('Não foi possível excluir o post. Tente novamente mais tarde.');
      }
    }
  }
} 