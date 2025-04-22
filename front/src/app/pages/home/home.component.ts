import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PostsRecentesComponent } from './posts-recentes/posts-recentes/posts-recentes.component';
import { CardElevacaoPadraoComponent } from '../../shared/components/card-elevacao-padrao/card-elevacao-padrao.component';
import { PostService } from '../../services/post.service';
import { TemaService } from '../../services/tema.service';
import { AuthService } from '../../services/auth.service';

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
    CardElevacaoPadraoComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  postsCountOption: any;
  postsTimelineOption: any;
  isLoggedIn: boolean = false;

  constructor(
    private dialog: MatDialog,
    private postService: PostService,
    private temaService: TemaService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = this.authService.isLoggedIn();
    await this.carregarDados();
  }

  async carregarDados(): Promise<void> {
    try {
      let dadosTemas: any[] = [];
      
      if (this.authService.isLoggedIn()) {
        try {
          dadosTemas = await this.temaService.getPostsPorTema();
          console.log('Dados dos temas carregados:', dadosTemas);
        } catch (error) {
          console.error('Erro ao carregar dados de temas:', error);
          dadosTemas = [];
        }
      } else {
        console.log('Usuário não está logado. Não é possível carregar dados de temas.');
      }

      // const dadosDiasSemana = await this.postService.getPostsPorDiaDaSemana();

      this.initChartTemas(dadosTemas);
      this.initChartDiasSemana([]);
    } catch (error) {
      console.error('Erro ao carregar dados para os gráficos:', error);
      this.initChartTemas([]);
      this.initChartDiasSemana([]);
    }
  }

  initChartTemas(dadosTemas: any[]): void {
    interface ChartDataItem {
      value: number;
      name: string;
    }
    
    let data: ChartDataItem[] = [];
    
    if (dadosTemas && dadosTemas.length > 0) {
      data = dadosTemas.map(item => ({
        value: item.quantidadePostagens,
        name: item.descricao || 'Sem descrição'
      }));
    }
    
    if (data.length === 0) {
      data = [{ value: 1, name: 'Sem dados disponíveis' }];
    }

    this.postsCountOption = {
      title: {
        text: 'Posts por Tema',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Posts',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: data,
        },
      ],
    };
  }

  initChartDiasSemana(dadosDias: any[]): void {
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const valores = Array(7).fill(0);
    
    // Preencher os valores com os dados recebidos
    dadosDias.forEach(item => {
      if (item.diaSemana >= 0 && item.diaSemana < 7) {
        valores[item.diaSemana] = item.quantidade;
      }
    });

    this.postsTimelineOption = {
      title: {
        text: 'Posts por Dia da Semana',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: diasSemana,
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
            color: 'rgba(180, 180, 180, 0.2)'
          }
        },
      ],
    };
  }
}
