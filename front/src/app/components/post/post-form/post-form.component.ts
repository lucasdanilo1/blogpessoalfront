import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Post } from '../../../models/post';
import { Tema } from '../../../models/tema';
import { PostService } from '../../../services/post.service';
import { TemaService } from '../../../services/tema.service';
import { SnackBarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule
],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Output() postAdicionado = new EventEmitter<Post>();
  
  postForm!: FormGroup;
  temas: Tema[] = [];
  carregandoTemas = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private temaService: TemaService,
    private snackBarService: SnackBarService,
    private dialogRef: MatDialogRef<PostFormComponent>
  ) { }

  async ngOnInit(): Promise<void> {
    this.initForm();
    await this.carregarTemas();
  }

  async carregarTemas(): Promise<void> {
    this.carregandoTemas = true;
    try {
      this.temas = await this.temaService.getAllTemas();
    } catch (error) {
      this.snackBarService.exibirMensagemErro('Não foi possível carregar os temas. Usando dados mockados.');
    } finally {
      this.carregandoTemas = false;
    }
  }

  initForm(): void {
    this.postForm = this.fb.group({
      titulo: ['', [Validators.required]],
      conteudo: ['', [Validators.required]],
      temaId: ['', [Validators.required]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.postForm.invalid) {
      Object.keys(this.postForm.controls).forEach(key => {
        const control = this.postForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    const novoPost: Post = {
      ...this.postForm.value,
      data: new Date()
    };

    try {
      const postCriado = await this.postService.createPost(novoPost);
      this.postForm.reset();
      this.snackBarService.exibirMensagemSucesso('Post publicado com sucesso!');
      this.postAdicionado.emit(postCriado);
    } catch (error) {
      this.snackBarService.exibirMensagemErro('Não foi possível publicar o post. Tente novamente mais tarde.');
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
} 