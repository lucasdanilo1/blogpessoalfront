import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from '../../shared/components/types/post.schemas';

/**
 * Componente responsável por exibir a lista de posts recentes
 */
@Component({
  selector: 'app-posts-recentes',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe
  ],
  templateUrl: './posts-recentes.component.html',
  styleUrl: './posts-recentes.component.scss'
})
export class PostsRecentesComponent {
  
  @Input() posts: Post[] = [];

}
