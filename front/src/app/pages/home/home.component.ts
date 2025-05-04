import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PostsRecentesComponent } from './posts-recentes/posts-recentes/posts-recentes.component';
import { CardElevacaoPadraoComponent } from '../../shared/components/card-elevacao-padrao/card-elevacao-padrao.component';
import { PostService } from '../../services/post.service';
import { TemaService } from '../../services/tema.service';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: {
        echarts: () => import('echarts'),
      },
    },
  ],
  imports: [
    CommonModule,
    NgxEchartsModule,
    MatDialogModule,
    PostsRecentesComponent,
    CardElevacaoPadraoComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  postsCountOption: any;
  postsTimelineOption: any;

  constructor(
    private postService: PostService,
    private temaService: TemaService,
    private snackBarService: SnackBarService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.carregarDados();
  }

  async carregarDados(): Promise<void> {
    try {
      const dadosTemas = await this.temaService.getPostsPorTema();

      const dadosDiasSemana = await this.postService.getPostsPorDiaDaSemana();

      this.initChartTemas(dadosTemas || []);
      this.initChartDiasSemana(dadosDiasSemana || []);
    } catch (error) {
      this.snackBarService.exibirMensagemErro('Erro ao carregar dados dos gráficos.');
    }
  }

  initChartTemas(dadosTemas: any[]): void {
    interface ChartDataItem {
      value: number;
      name: string;
    }

    let data: ChartDataItem[] = (dadosTemas || [])
      .map((item) => ({
        value: item.quantidadePostagens,
        name: item.descricao || 'Sem descrição',
      }))
      .filter(item => item.value > 0);

    if (data.length === 0) {
      data = [{ value: 1, name: 'Sem dados disponíveis' }];
    } else if (data.length > 5) {
      data.sort((a, b) => b.value - a.value);
      const top5 = data.slice(0, 5);
      const outros = data.slice(5).reduce(
        (acc, item) => ({ value: acc.value + item.value, name: 'Outros' }),
        { value: 0, name: 'Outros' }
      );
      if (outros.value > 0) {
        data = [...top5, outros];
      } else {
        data = top5;
      }
    }

    this.postsCountOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'center',
        data: data.map(item => item.name)
      },
      series: [
        {
          name: 'Posts',
          type: 'pie',
          radius: '70%',
          center: ['60%', '50%'],
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            show: true
          },
          label: {
            show: true
          }
        }
      ]
    };
  }

  initChartDiasSemana(dadosDias: any[]): void {
    const diasSemana = [
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
      'Domingo'
    ];

    const dadosMap = new Map<string, number>(
      dadosDias.map(item => [item.diaDaSemana.toLowerCase(), item.quantidade])
    );

    const valores = diasSemana.map(dia => dadosMap.get(dia.toLowerCase()) || 0);

    this.postsTimelineOption = {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: diasSemana,
        axisLabel: {
          interval: 0,
          rotate: 0
        }
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: valores,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
          barWidth: '40%',
          barGap: '10%',
          itemStyle: {
            borderRadius: [4, 4, 0, 0]
          }
        },
      ],
    };
  }
}
