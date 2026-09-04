import { Component, inject, computed, input, effect, PLATFORM_ID, viewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js';
import { LatinAmericaService } from '../../../../core/services/dashboard-services/latin-america.service';
import { ColDeptService } from '../../../../core/services/dashboard-services/col-dept.service';

@Component({
  selector: 'app-mp-households-dep',
  imports: [],
  templateUrl: './mp-households-dep.html',
  styleUrl: './mp-households-dep.css',
})
export class MPHouseholdsDep {
  private dashboardService = inject(ColDeptService);
  private platformId = inject(PLATFORM_ID);

  chartElement = viewChild<ElementRef<HTMLCanvasElement>>('Chart');
  private chartInstance?: Chart;

  data = computed(() => this.dashboardService.pmiData());

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
    const values: number[] = items.map((item) => Number(item.ipm));

    this.chartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [
          'Personas que habitan ese hogar',
          'Priación por bajo logro educativo',
          'Privación por analfabetismo',
          'Privación por inasistencia escolar',
          'Privación por Atención Integral a la Primera Infancia',
          'Privación por Trabajo Infantil',
          'Privación por no aseguramiento en salud',
          'Privación por barreras de acceso a salud',
          'Privación por Desempleo de Larga Duración',
          'Privación por Tasa de Empleo Formal',
          'Privación por no acceso a fuente de agua mejorada',
          'Privación por inadecuada eliminación de excretas',
          'Privación por inadecuado material de pisos',
          'Privación por inadecuado material de paredes exteriores',
          'Privación por hacinamiento crítico',
          'Pobre'],
        datasets: [
          {
            label: 'IPM (%)',
            data: [0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
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
    const labels = items.map(item => item.dominio);

    // Extraer valores del IPM para las Barras
    const dataValues = items.map(item => Number(item.ipm));

    // Actualizar y renderizar la gráfica
    this.chartInstance.data.labels = labels;
    this.chartInstance.data.datasets[0].data = dataValues;
    this.chartInstance.update();
  }
}
