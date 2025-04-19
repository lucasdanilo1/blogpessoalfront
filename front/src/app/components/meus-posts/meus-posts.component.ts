import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from '../post/post-list/post-list.component';
import { PostService } from '../../services/post.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PostFormComponent } from '../post/post-form/post-form.component';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '../../services/snackbar.service';
import { DefaultButtonComponent } from '../shared/default-button/default-button.component';
import { PostItemComponent } from "../post/post-item/post-item.component";
import { Post } from '../../shared/components/types/post.schemas';

@Component({
  selector: 'app-meus-posts',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    DefaultButtonComponent,
    PostItemComponent,
],
  templateUrl: './meus-posts.component.html',
  styleUrls: ['./meus-posts.component.scss']
})
export class MeusPostsComponent implements OnInit {
  userPosts: Post[] = [];
    @ViewChild('postList') postListComponent!: PostListComponent;
  
  constructor(
    private postService: PostService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUserPosts();
  }

  async loadUserPosts(): Promise<void> {
    try {
      this.userPosts = await this.postService.getUserPosts();
      this.cdr.detectChanges();
    } catch (error) {
      this.snackBarService.exibirMensagemErro('Não foi possível carregar seus posts. Tente novamente mais tarde.');
    }
  }

  abrirFormularioPost(): void {
    const dialogRef = this.dialog.open(PostFormComponent, {
      width: '600px',
      disableClose: false
    });

    dialogRef.componentInstance.postAdicionado.subscribe((novoPost: Post) => {
      dialogRef.close();
    });
  }
}
