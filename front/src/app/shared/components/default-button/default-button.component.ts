import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ButtonOptions {
  label: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  labelLoading?: string;
  variant?: 'primary' | 'secondary';
  onclick: EventEmitter<MouseEvent>;
}

@Component({
  selector: 'app-default-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss']
})
export class DefaultButtonComponent implements OnInit, ButtonOptions {
  @Input() label!: string;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() loading = false;
  @Input() labelLoading = 'Carregando...';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Output() onclick = new EventEmitter<MouseEvent>();

  ngOnInit(): void {
    if (!this.label) throw new Error('O botão requer um label');
    if (this.disabled === undefined || this.disabled === null)
      throw new Error('O botão requer o atributo disabled');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.onclick.emit(event);
    }
  }
} 