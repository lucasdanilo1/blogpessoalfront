import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ButtonOptions {
  label: string;
  iconClass?: string;
  onclick: EventEmitter<MouseEvent>;
  disabled?: boolean;
  cssClass?: string;
  type?: string;
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
  @Input() iconClass?: string;
  @Input() disabled?: boolean = false;
  @Input() cssClass?: string = '';
  @Input() type?: string = 'button';
  @Output() onclick = new EventEmitter<MouseEvent>();

  ngOnInit(): void {
    if (!this.label) throw new Error('O botão requer um label');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.onclick.emit(event);
    }
  }
}
