import { Component, inject, computed, input, effect, PLATFORM_ID, viewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js';
import { ColNationalService } from '../../../../core/services/dashboard-services/col-national.service';

@Component({
  selector: 'app-mpi-boss-sex',
  imports: [],
  templateUrl: './mpi-boss-sex.html',
  styleUrl: './mpi-boss-sex.css',
})
export class MpiBossSex {
  private dashboardService = inject(ColNationalService);
  private platformId = inject(PLATFORM_ID);

  chartElement = viewChild<ElementRef<HTMLCanvasElement>>('Chart');
  private chartInstance?: Chart;

  data = computed(() => this.dashboardService.mpiBossSexData());

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
    const menData = this.extractMenData(items);
    const womenData = this.extractWomenData(items);
    this.chartInstance = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Hombres',
            data: menData,
            backgroundColor: 'rgba(54, 162, 235, 1)',
            pointRadius: 7
          },
          {
            label: 'Mujeres',
            data: womenData,
            backgroundColor: 'rgba(255, 99, 132, 1)',
            pointRadius: 7
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: { display: true, text: 'Año' },
            ticks: { stepSize: 1 }
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Incidencia IPM (%)' }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const raw = ctx.raw as { x: number; y: number };
                return `${ctx.dataset.label}: ${raw.y}%`;
              }
            }
          }
        }
      }
    });

  }

  private updateChartData(items: any[]) {
    if (!this.chartInstance) return;

    // Filtrar puntos para hombres y muejeres
    const menData = this.extractMenData(items);
    const womenData = this.extractWomenData(items);


    // Actualizar y renderizar la gráfica
    this.chartInstance.data.datasets[0].data = menData;
    this.chartInstance.data.datasets[1].data = womenData;
    this.chartInstance.update();
  }

  private extractMenData(items: any[]) {
    const menData = items
      .filter((item) => item.sexo === 'Hombre')
      .map((item) => ({
        x: Number(item.anio),
        y: Number(item.porcentaje)
      }));

    return menData;
  };

  private extractWomenData(items: any[]) {
    const womenData = items
      .filter((item) => item.sexo === 'Mujer')
      .map((item) => ({
        x: Number(item.anio),
        y: Number(item.porcentaje)
      }));

    return womenData;
  };
}
