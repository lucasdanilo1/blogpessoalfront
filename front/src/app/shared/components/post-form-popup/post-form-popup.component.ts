import { Component, OnInit } from '@angular/core';
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
import { DefaultButtonComponent } from '../default-button/default-button.component';

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
    NovoTemaDialogComponent,
    DefaultButtonComponent
  ],
  templateUrl: './post-form-popup.component.html',
  styleUrls: ['./post-form-popup.component.scss']
})
export class PostFormPopUpComponent implements OnInit {
  postForm!: FormGroup;
  temas: Tema[] = [];

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private temaService: TemaService,
    private snackBarService: SnackBarService,
    private dialogRef: MatDialogRef<PostFormPopUpComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarTemas();
  }

  inicializarFormulario(): void {
    this.postForm = this.fb.group({
      titulo: ['', Validators.required],
      texto: ['', Validators.required],
      temaId: ['', Validators.required]
    });

    this.postForm.get('temaId')?.valueChanges.subscribe(value => {
      if (value === 'novo') {
        this.abrirFormularioNovoTema();
      }
    });
  }

  async carregarTemas(): Promise<void> {
    try {
      this.temas = await this.temaService.getTemas();
    } catch (error) {
      this.snackBarService.exibirMensagemErro('Não foi possível carregar os temas.');
    }
  }

  async onSubmit(): Promise<void> {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    try {
      const novoPost: Post = {
        ...this.postForm.value,
        data: new Date()
      };

      await this.postService.createPost(novoPost);
      this.snackBarService.exibirMensagemSucesso('Post publicado!');
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

    dialogRef.afterClosed().subscribe(async (descricao: string) => {
      if (descricao) {
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
      } else {
        this.postForm.get('temaId')?.setValue('');
      }
    });
  }
}
