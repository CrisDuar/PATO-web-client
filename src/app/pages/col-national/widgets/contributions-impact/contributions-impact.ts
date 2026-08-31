import { Component, inject, computed, input, effect, PLATFORM_ID, viewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-contributions-impact',
  imports: [],
  templateUrl: './contributions-impact.html',
  styleUrl: './contributions-impact.css',
})
export class ContributionsImpact {
  private dashboardService = inject(DashboardService);
  private platformId = inject(PLATFORM_ID);

  chartElement = viewChild<ElementRef<HTMLCanvasElement>>('Chart');
  private chartInstance?: Chart;

  data = computed(() => this.dashboardService.contributionImpactData());

  constructor() {
    effect(() => {
      const items = this.data();
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
    const items = this.data();
    const labels = items.map((item) => item.dominio);
    const values: number[] = items.map((item) => Number(item.porcentaje));
    this.chartInstance = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Educación', 'Niñez y juventud', 'Trabajo', 'Salud', 'Vivienda'],
        datasets: [{
          label: 'IPM (%)',
          data: [10, 20, 43, 98, 56],
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
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

      }
    });

  }

  private updateChartData(items: any[]) {
    if (!this.chartInstance) return;

    // Extraer nombres de dominios para los Labels
    const labels = items.map(item => item.dominio);

    // Extraer valores del IPM para las Barras
    const dataValues = items.map(item => Number(item.porcentaje));

    // Actualizar y renderizar la gráfica
    this.chartInstance.data.labels = labels;
    this.chartInstance.data.datasets[0].data = dataValues;
    this.chartInstance.update();
  }
}
