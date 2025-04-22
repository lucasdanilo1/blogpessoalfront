import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Tema } from '../../../shared/types/tema.schemas';
import { PostService } from '../../../services/post.service';
import { TemaService } from '../../../services/tema.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { Post } from '../../../shared/types/post.schemas';
import { NovoTemaDialogComponent } from './novo-tema-dialog/novo-tema-dialog.component';

@Component({
  selector: 'post-form-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NovoTemaDialogComponent
  ],
  templateUrl: './post-form-popup.component.html',
  styleUrls: ['./post-form-popup.component.scss']
})
export class PostFormPopUpComponent implements OnInit {
  
  postForm!: FormGroup;
  temas: Tema[] = [];
  carregandoTemas = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private temaService: TemaService,
    private snackBarService: SnackBarService,
    private dialogRef: MatDialogRef<PostFormPopUpComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.carregarTemas();
  }

  async carregarTemas(): Promise<void> {
    this.carregandoTemas = true;
    
    try {
      this.temas = await this.temaService.getTemas();
    } catch (error) {
      this.snackBarService.exibirMensagemErro('Não foi possível carregar os temas.');
    } finally {
      this.carregandoTemas = false;
    }
  }

  initForm(): void {
    this.postForm = this.fb.group({
      titulo: ['', Validators.required],
      texto: ['', Validators.required],
      temaId: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }
    
    const novoPost: Post = {
      ...this.postForm.value,
      data: new Date()
    };

    try {
      await this.postService.createPost(novoPost);
      this.snackBarService.exibirMensagemSucesso('Post publicado');
      this.dialogRef.close(true);
    } catch (error) {
      this.snackBarService.exibirMensagemErro('Não foi possível publicar o post.');
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  abrirFormularioNovoTema(): void {
    const dialogRef = this.dialog.open(NovoTemaDialogComponent, {
      width: '400px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.criarNovoTema(result);
      } else {
        this.postForm.get('temaId')?.setValue('');
      }
    });
  }

  async criarNovoTema(descricao: string): Promise<void> {
    try {
      const novoTema = await this.temaService.criarTema({ descricao });
      this.snackBarService.exibirMensagemSucesso('Tema criado com sucesso!');
      
      await this.carregarTemas();
      
      if (novoTema.id) {
        this.postForm.get('temaId')?.setValue(novoTema.id);
      }
    } catch (error) {
      this.snackBarService.exibirMensagemErro('Não foi possível criar o tema.');
      this.postForm.get('temaId')?.setValue('');
    }
  }
} 