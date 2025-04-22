import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../shared/types/post.schemas';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    DatePipe
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post | null = null;
  isLoading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private snackbarService: SnackBarService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadPost();
  }

  async loadPost(): Promise<void> {
    this.isLoading = true;
    this.error = false;
    
    try {
      const postId = Number(this.route.snapshot.paramMap.get('id'));
      
      this.post = await this.postService.getPostById(postId);
    } catch (error) {
      this.error = true;
      this.snackbarService.exibirMensagemErro('Erro ao carregar o post. Tente novamente mais tarde.');
      console.error('Erro ao carregar post:', error);
    } finally {
      this.isLoading = false;
    }
  }

  voltarPaginaAnterior(): void {
    this.location.back();
  }
}
