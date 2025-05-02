import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DefaultButtonComponent } from '../../../../shared/components/default-button/default-button.component';

@Component({
  selector: 'app-novo-tema-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    DefaultButtonComponent
  ],
  templateUrl: './novo-tema-dialog.component.html',
  styleUrls: ['./novo-tema-dialog.component.scss']
})
export class NovoTemaDialogComponent {
  temaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NovoTemaDialogComponent>
  ) {
    this.temaForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.temaForm.invalid) {
      this.temaForm.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.temaForm.get('descricao')?.value);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
