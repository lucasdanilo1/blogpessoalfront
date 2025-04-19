import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public exibirMensagemSucesso(
    mensagem = 'Solicitação efetuada com sucesso!',
    mensagemBotao = 'Fechar',
    snackBarOptions: MatSnackBarConfig<any> = {
      duration: 4000,
      direction: 'ltr',
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    },
    callback?: () => void
  ): void {
    this.snackBar.open(`✔ ${mensagem}`, mensagemBotao, snackBarOptions);

    if (callback) {
      callback();
    }
  }

  public exibirMensagemErro(
    mensagem = 'Houve um erro com sua solicitação!',
    mensagemBotao = 'Fechar',
    snackBarOptions: MatSnackBarConfig<any> = {
      duration: 4000,
      direction: 'ltr',
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    },
    callback?: () => void
  ): void {
    this.snackBar.open(`❌ ${mensagem}`, mensagemBotao, snackBarOptions);

    if (callback) {
      callback();
    }
  }
} 