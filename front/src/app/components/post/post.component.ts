import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PostFormComponent } from './post-form/post-form.component';
import { PostListComponent } from './post-list/post-list.component';
import { Post } from '../../shared/components/types/post.schemas';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    PostFormComponent,
    PostListComponent
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @ViewChild(PostListComponent) postList!: PostListComponent;

  onPostAdicionado(post: Post): void {
    if (this.postList) {
      this.postList.adicionarNovoPost(post);
    }
  }
} 