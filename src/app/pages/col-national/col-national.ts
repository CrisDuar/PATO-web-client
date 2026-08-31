import { Component, inject, signal, effect } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Widget } from '../../components/widget/widget';
import { Navbar } from '../../components/navbar/navbar';
import { DashboardService } from '../../core/services/dashboard.service';
import { isPlatformBrowser } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-col-national',
  imports: [Navbar, NgComponentOutlet, MatSelectModule, MatFormFieldModule],
  templateUrl: './col-national.html',
  styleUrl: './col-national.css',
})
export class ColNational {
  public dashboardService = inject(DashboardService);

  availableYears = signal<number[]>([2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 
    2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  availableDomains = signal<string[]>(
    ['Nacional',
      'Cabeceras',
      'Centros poblados y rural disperso', 

    ]
  );

  selectedYear = signal<number>(2010);
  selectedYear2 = signal<number>(2010);
  selectedYear3 = signal<number>(2010);
  selectedDomain = signal<string>('Nacional');

  constructor() {
    effect(() => {
      const year = this.selectedYear();
      const year2 = this.selectedYear2();
      const year3 = this.selectedYear3();
      const domain = this.selectedDomain();

      this.dashboardService.loadIpmData(year);
      this.dashboardService.loadIntensityPovertyData(year3);
      this.dashboardService.loadPrivationsData(domain, year2);
    });
  }
}
