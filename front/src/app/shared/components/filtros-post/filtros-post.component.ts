import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription, debounceTime } from 'rxjs';
import { CardElevacaoPadraoComponent } from '../card-elevacao-padrao/card-elevacao-padrao.component';
import { Tema } from '../../types/tema.schemas';
import { FiltrosPostagemDTO } from '../../types/post.schemas';
import { MatIcon, MatIconModule } from '@angular/material/icon';

interface FiltrosFormGroup {
  termo: FormControl<string | null>;
  temaId: FormControl<number | null>;
  dataInicio: FormControl<Date | null>;
  dataFim: FormControl<Date | null>;
}

@Component({
  selector: 'app-filtros-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CardElevacaoPadraoComponent,
    MatIconModule
  ],
  templateUrl: './filtros-post.component.html',
  styleUrl: './filtros-post.component.scss'
})
export class FiltrosPostComponent implements OnInit, OnDestroy {
  @Input() temas: Tema[] = [];
  @Output() filtrosChange = new EventEmitter<FiltrosPostagemDTO>();

  filtrosForm!: FormGroup<FiltrosFormGroup>;
  formSubscription?: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.observarMudancasForm();
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  inicializarFormulario(): void {
    this.filtrosForm = this.fb.group({
      termo: new FormControl<string | null>(''),
      temaId: new FormControl<number | null>(null),
      dataInicio: new FormControl<Date | null>(null),
      dataFim: new FormControl<Date | null>(null)
    }) as FormGroup<FiltrosFormGroup>;
  }

  observarMudancasForm(): void {
    this.formSubscription = this.filtrosForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.atualizarFiltros();
      });
  }

  atualizarFiltros(): void {
    const filtros: FiltrosPostagemDTO = {
      termo: this.filtrosForm.value.termo || undefined,
      temaId: this.filtrosForm.value.temaId ? Number(this.filtrosForm.value.temaId) : undefined,
      dataInicio: this.filtrosForm.value.dataInicio || undefined,
      dataFim: this.filtrosForm.value.dataFim || undefined
    };
    this.filtrosChange.emit(filtros);
  }
}
