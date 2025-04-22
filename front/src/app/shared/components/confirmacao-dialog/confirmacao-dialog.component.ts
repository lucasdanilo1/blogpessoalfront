import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface ConfirmacaoDialogData {
  titulo: string;
  mensagem: string;
  botaoConfirmarTexto: string;
  botaoCancelarTexto: string;
}

@Component({
  selector: 'app-confirmacao-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.titulo }}</h2>
    <mat-dialog-content>
      <p>{{ data.mensagem }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancelar()">{{ data.botaoCancelarTexto }}</button>
      <button mat-raised-button color="warn" (click)="onConfirmar()">{{ data.botaoConfirmarTexto }}</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmacaoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmacaoDialogData
  ) {}

  onConfirmar(): void {
    this.dialogRef.close(true);
  }

  onCancelar(): void {
    this.dialogRef.close(false);
  }
} 