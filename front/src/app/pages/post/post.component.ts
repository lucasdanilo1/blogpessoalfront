import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../shared/types/post.schemas';
import { SnackBarService } from '../../services/snackbar.service';
import { DefaultButtonComponent } from '../../shared/components/default-button/default-button.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DatePipe,
    DefaultButtonComponent
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post | null = null;

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
    try {
      const postId = Number(this.route.snapshot.paramMap.get('id'));

      this.post = await this.postService.getPostById(postId);
    } catch (error) {
      this.snackbarService.exibirMensagemErro('Erro ao carregar o post.');
    }
  }

  voltarPaginaAnterior(): void {
    this.location.back();
  }
}
