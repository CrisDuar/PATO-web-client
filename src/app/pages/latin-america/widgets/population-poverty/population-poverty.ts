import { Component, inject, computed, input, effect, PLATFORM_ID, viewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js';
import { LatinAmericaService } from '../../../../core/services/dashboard-services/latin-america.service';

@Component({
  selector: 'app-population-poverty',
  imports: [],
  templateUrl: './population-poverty.html',
  styleUrl: './population-poverty.css',
})
export class PopulationPoverty {
  private dashboardService = inject(LatinAmericaService);
  private platformId = inject(PLATFORM_ID);

  chartElement = viewChild<ElementRef<HTMLCanvasElement>>('Chart');
  private chartInstance?: Chart;

  populationData = this.dashboardService.populationData;

  constructor() {
    effect(() => {
      const items = this.populationData();
      if (this.chartInstance && items && items.length > 0) {
        this.updateChartData(items);
      }
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      const canvas = this.chartElement()?.nativeElement;
      if (canvas && !this.chartInstance) {
        this.initChart(canvas);
      }
    }, 150);
  }

  private initChart(canvas: HTMLCanvasElement) {
    const items = this.populationData();
    const labels = items.map((item) => item.grupo_erario);
    const values: number[] = items.map((item) => Number(item.valor_porcentaje));

    this.chartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'IPM (%)',
            data: values,
            backgroundColor: [
              'rgb(255, 99, 133)',
              'rgb(255, 160, 64)',
              'rgb(255, 204, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 163, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'IPM (%)' },
          },
          x: { title: { display: true, text: 'Dominios' } }
        }
      }
    });

  }

  private updateChartData(items: any[]) {
    if (!this.chartInstance) return;

    // Extraer nombres de dominios para los Labels
    const labels = items.map(item => item.grupo_erario);

    // Extraer valores del IPM para las Barras
    const dataValues = items.map(item => Number(item.valor_porcentaje));

    // Actualizar y renderizar la gráfica
    this.chartInstance.data.labels = labels;
    this.chartInstance.data.datasets[0].data = dataValues;
    this.chartInstance.update();
  }
}
  
