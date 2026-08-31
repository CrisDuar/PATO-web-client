import { Component, computed, ElementRef, inject, PLATFORM_ID, effect, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-intensity-poverty',
  imports: [],
  templateUrl: './intensity-poverty.html',
  styleUrl: './intensity-poverty.css',
})
export class IntensityPoverty {
  private dashboardService = inject(DashboardService);
  private platformId = inject(PLATFORM_ID);

  chartElement = viewChild<ElementRef<HTMLCanvasElement>>('Chart');
  private chartInstance?: Chart;

  data = computed(() => this.dashboardService.intensityPovertyData());

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
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
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
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'IPM (%)' },
          },
          x: {title: { display: true, text: 'Dominios' }}
        }
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
