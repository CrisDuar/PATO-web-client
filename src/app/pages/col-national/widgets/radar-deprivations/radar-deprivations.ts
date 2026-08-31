import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, viewChild, inject, PLATFORM_ID, computed, effect } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { DeprivationsItem } from '../../../../interfaces/ipm.interface';

@Component({
  selector: 'app-radar-deprivations',
  imports: [],
  templateUrl: './radar-deprivations.html',
  styleUrl: './radar-deprivations.css',
})
export class RadarDeprivations {
  private dashboardService = inject(DashboardService);
  private platformId = inject(PLATFORM_ID);

  chartElement = viewChild<ElementRef<HTMLCanvasElement>>('Chart');
  private chartInstance?: Chart;

  ipmData = computed(() => this.dashboardService.deprivationsData());

  constructor() {
    effect(() => {
      const items = this.ipmData();
      if (this.chartInstance && items.length > 0) {
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
    const items = this.ipmData();
    const labels = items.map((item) => item.variable);
    const values = items.map((item) => item.ipm);
    const domainName = items[0]?.dominio || 'Nacional';
    const yearVal = items[0]?.anio || '';

    this.chartInstance = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [
        {
          label: `${domainName} (${yearVal})`,
          data: values,
          fill: true,
          backgroundColor: 'rgba(212, 111, 162, 0.25)', 
          borderColor: '#d14b99',
          borderWidth: 2,
          pointBackgroundColor: '#bb458a',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 60,   // Espacio reservado para etiquetas izquierdas
      right: 60,  // Espacio reservado para etiquetas derechas
      top: 20,
      bottom: 20
    }
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: { display: false },
      pointLabels: {
        font: { size: 10 },
        color: '#475569',
        // Fuerza el salto de línea en etiquetas compuestas
        callback: (label: string) => {
          if (label.length > 12) {
            const words = label.split(' ');
            const mid = Math.ceil(words.length / 2);
            return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
          }
          return label;
        }
      }
    }
  }
},
  });
  }

  private updateChartData(items: DeprivationsItem[]) {
    if (!this.chartInstance) return;

    this.chartInstance.data.labels = items.map((item) => item.variable);
    this.chartInstance.data.datasets[0].data = items.map((item) => item.ipm);
    this.chartInstance.data.datasets[0].label = `Privaciones - ${items[0]?.dominio} (${items[0]?.anio})`;

    this.chartInstance.update();
  }

  ngOnDestroy() {
    this.chartInstance?.destroy();
  }
}
