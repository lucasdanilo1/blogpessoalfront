import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/Usuario';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, {
      validators: this.confirmarSenhaValidator
    });
  }

  confirmarSenhaValidator(group: FormGroup): { [key: string]: boolean } | null {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;

    if (senha && confirmarSenha && senha !== confirmarSenha) {
      return { senhasDiferentes: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const usuario: Usuario = {
      nome: this.cadastroForm.get('nome')?.value,
      usuario: this.cadastroForm.get('usuario')?.value,
      senha: this.cadastroForm.get('senha')?.value
    };

    this.authService.cadastrar(usuario).subscribe({
      next: () => {
        this.snackBarService.exibirMensagemSucesso('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao cadastrar. Tente novamente.';
        this.snackBarService.exibirMensagemErro('Erro ao cadastrar. Tente novamente.');
      }
    });
  }
} 