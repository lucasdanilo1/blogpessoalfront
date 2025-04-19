import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { Post } from '../../models/post';
import { PostsRecentesComponent } from '../posts-recentes/posts-recentes.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PostFormComponent } from '../post/post-form/post-form.component';
import { DefaultButtonComponent } from '../shared/default-button/default-button.component';

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
    DatePipe,
    PostsRecentesComponent,
    MatDialogModule,
    DefaultButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  postsCountOption: any;
  postsTimelineOption: any;

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mockPosts();
    this.initCharts();
  }

  mockPosts(): void {
    this.posts = [
      { id: 1, titulo: 'Primeiro Post', texto: 'Conteúdo do primeiro post', tema: {descricao: "a"}, usuario: {id: 1, nome: "Lucas"}, data: new Date(2023, 7, 15) },
      { id: 1, titulo: 'Primeiro Post', texto: 'Conteúdo do primeiro post', tema: {descricao: "a"}, usuario: {id: 1, nome: "Lucas"}, data: new Date(2023, 7, 15) },
    ];
  }

  initCharts(): void {
    this.postsCountOption = {
      title: {
        text: 'Posts por Tema',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
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
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 2, name: 'Tema 1' },
            { value: 2, name: 'Tema 2' },
            { value: 1, name: 'Tema 3' }
          ]
        }
      ]
    };

    this.postsTimelineOption = {
      title: {
        text: 'Posts ao Longo do Tempo',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Ago', 'Set', 'Out', 'Nov', 'Dez']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [1, 1, 1, 1, 1],
          type: 'line',
          smooth: true
        }
      ]
    };
  }

  navigateToNewPost(): void {
    const dialogRef = this.dialog.open(PostFormComponent, {
      width: '600px',
      disableClose: false
    });

    dialogRef.componentInstance.postAdicionado.subscribe((novoPost: Post) => {
      this.posts.push(novoPost);
      dialogRef.close();
    });
  }
} 