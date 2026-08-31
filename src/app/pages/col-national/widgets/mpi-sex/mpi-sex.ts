import { Component, inject, computed, input, effect, PLATFORM_ID, viewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-mpi-sex',
  imports: [],
  templateUrl: './mpi-sex.html',
  styleUrl: './mpi-sex.css',
})
export class MpiSex {
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
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Hombres',
              data: [
                { x: 2020, y: 12 },
                { x: 2021, y: 45 },
                { x: 2022, y: 34 },
                { x: 2023, y: 54 },
                { x: 2024, y: 14 },
                { x: 2025, y: 56 }
              ],
              backgroundColor: 'rgba(54, 162, 235, 1)',
              pointRadius: 7
            },
            {
              label: 'Mujeres',
              data: [
                { x: 2020, y: 39 },
                { x: 2021, y: 29 },
                { x: 2022, y: 17 },
                { x: 2023, y: 47 },
                { x: 2024, y: 63 },
                { x: 2025, y: 33 }
              ],
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

