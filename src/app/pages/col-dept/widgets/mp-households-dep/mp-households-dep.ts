import { Component, inject, computed, input, effect, PLATFORM_ID, viewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js';
import { LatinAmericaService } from '../../../../core/services/dashboard-services/latin-america.service';
import { ColDeptService } from '../../../../core/services/dashboard-services/col-dept.service';
import { IndicatorDeptItem } from '../../../../interfaces/ipm.interface';

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

  populationData = this.dashboardService.indicatorsDeptData;

  constructor() {
    effect(() => {
      const items = this.populationData();
      if (this.chartInstance && items && items.length > 0) {
        // Pasa el primer registro del arreglo de departamentos
        this.updateChartData(items[0]);
      }
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      const canvas = this.chartElement()?.nativeElement;
      const items = this.populationData();
      if (canvas && !this.chartInstance && items && items.length > 0) {
        this.initChart(canvas, items[0]);
      }
    }, 150);
  }

  // Método auxiliar para evitar duplicar el mapeo de los 14 indicadores
  private getPrivationsMap(item: IndicatorDeptItem) {
    return [
      { label: 'Bajo logro educativo', value: item.privacion_bajo_logro_educativo },
      { label: 'Analfabetismo', value: item.privacion_analfabetismo },
      { label: 'Inasistencia escolar', value: item.privacion_inasistencia_escolar },
      { label: 'Rezago escolar', value: item.privacion_rezago_escolar },
      { label: 'Atención primera infancia', value: item.privacion_atencion_integral_primera_infancia },
      { label: 'Trabajo infantil', value: item.privacion_trabajo_infantil },
      { label: 'Sin aseguramiento en salud', value: item.pprivacion_no_aseguramiento_salud },
      { label: 'Barreras de acceso a salud', value: item.privacion_barreras_acceso_salud },
      { label: 'Desempleo de larga duración', value: item.privacion_desempleo_larga_duracion },
      { label: 'Empleo informal', value: item.privacion_tasa_empleo_formal },
      { label: 'Sin acceso a agua mejorada', value: item.privacion_no_acceso_agua_mejorada },
      { label: 'Pisos inadecuados', value: item.privacion_inadecuado_material_piso },
      { label: 'Paredes inadecuadas', value: item.privacion_inadecuado_material_paredes },
      { label: 'Hacinamiento crítico', value: item.privacion_hacinamiento_critico }
    ];
  }

  private initChart(canvas: HTMLCanvasElement, item: IndicatorDeptItem) {
    const privationsMap = this.getPrivationsMap(item);

    this.chartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: privationsMap.map(p => p.label),
        datasets: [
          {
            label: `Porcentaje de privación - ${item.departamento} (${item.anio})`,
            data: privationsMap.map(p => p.value),
            backgroundColor: [
              'rgb(255, 99, 133)',
              'rgb(255, 160, 64)',
              'rgb(255, 204, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 163, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y', // Barras horizontales para garantizar la lectura de las 14 etiquetas
        plugins: {
          legend: { display: true, position: 'top' },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.raw}%`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: { display: true, text: 'Porcentaje de privación (%)' },
            ticks: { callback: (val) => `${val}%` }
          },
          y: {
            ticks: { font: { size: 11 } }
          }
        }
      }
    });
  }

  private updateChartData(item: IndicatorDeptItem): void {
    if (!this.chartInstance) return;

    const privationsMap = this.getPrivationsMap(item);

    // Actualiza etiquetas, dataset y título dinámicamente al cambiar el departamento
    this.chartInstance.data.labels = privationsMap.map(p => p.label);
    this.chartInstance.data.datasets[0].label = `Porcentaje de privación - ${item.departamento} (${item.anio})`;
    this.chartInstance.data.datasets[0].data = privationsMap.map(p => p.value);
    
    this.chartInstance.update();
  }
}
