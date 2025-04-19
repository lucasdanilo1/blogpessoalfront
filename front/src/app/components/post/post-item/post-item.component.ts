import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from '../../../models/post';
import { CardElevacaoPadraoComponent } from '../../../shared/components/card-elevacao-padrao.component';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CardElevacaoPadraoComponent
  ],
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  @Output() deletePostEvent = new EventEmitter<number>();

  ngOnInit(): void {
    console.log(this.post);
  }

  onDelete(): void {
    if (this.post.id) {
      this.deletePostEvent.emit(this.post.id);
    }
  }
} 