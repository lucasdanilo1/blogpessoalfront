import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from '../../models/post';

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
  /**
   * Lista de posts a serem exibidos
   */
  @Input() posts: Post[] = [];
}
