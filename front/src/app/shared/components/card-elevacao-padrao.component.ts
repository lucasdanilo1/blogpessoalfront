import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'card-elevacao-padrao',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div
      class="mat-elevation-z8 card-elevation d-flex flex-column justify-content-between p-{{
        padding
      }}"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./card-elevacao-padrao.component.scss'],
})
export class CardElevacaoPadraoComponent {
  @Input() padding: '0' | '1' | '2' | '3' | '4' | '5' = '3';
  @Input() labelExcluir!: string;
  @Input() labelAtivar?: string;
}
