import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, viewChild, inject, PLATFORM_ID, computed, effect } from '@angular/core';
import Chart from 'chart.js/auto';
import { ContributionPovertyItem, DeprivationsItem } from '../../../../interfaces/ipm.interface';
import { LatinAmericaService } from '../../../../core/services/dashboard-services/latin-america.service';

@Component({
  selector: 'app-contribution-deprivations',
  imports: [],
  templateUrl: './contribution-deprivations.html',
  styleUrl: './contribution-deprivations.css',
})
export class ContributionDeprivations {
  private dashboardService = inject(LatinAmericaService);
  private platformId = inject(PLATFORM_ID);

  chartElement = viewChild<ElementRef<HTMLCanvasElement>>('Chart');
  private chartInstance?: Chart;

  contributionData = this.dashboardService.contributionData;

  constructor() {
    effect(() => {
      const items = this.contributionData();
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
    const items = this.contributionData();
    const labels = items.map((item) => item.privacion);
    const values = items.map((item) => item.porcentaje);
    const domainName = items[0]?.pais || 'Nacional';
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
      left: 60,   
      right: 60,  
      top: 20,
      bottom: 20
    }
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 50,
      ticks: { display: false },
      pointLabels: {
        font: { size: 10 },
        color: '#475569',
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

  private updateChartData(items: ContributionPovertyItem[]) {
    if (!this.chartInstance) return;

    this.chartInstance.data.labels = items.map((item) => item.privacion);
    this.chartInstance.data.datasets[0].data = items.map((item) => item.porcentaje);
    this.chartInstance.data.datasets[0].label = `Privaciones - ${items[0]?.pais} (${items[0]?.anio})`;

    this.chartInstance.update();
  }

  ngOnDestroy() {
    this.chartInstance?.destroy();
  }
}
