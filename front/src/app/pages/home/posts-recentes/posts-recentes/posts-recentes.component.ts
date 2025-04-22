import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from '../../../../shared/types/post.schemas';
import { PostItemComponent } from '../../../../shared/components/post-item/post-item.component';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-posts-recentes',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    PostItemComponent
  ],
  templateUrl: './posts-recentes.component.html',
  styleUrl: './posts-recentes.component.scss'
})
export class PostsRecentesComponent implements OnInit {
  
  @Input() posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.carregarPostsRecentes();
  }

  async carregarPostsRecentes(): Promise<void> {
    this.posts = await this.postService.getUltimosPosts();
  }

  onPostExcluido(): void {
    this.carregarPostsRecentes();
  }
}
