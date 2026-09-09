import { Component, inject, signal, effect } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Widget } from '../../components/widget/widget';
import { Navbar } from '../../components/navbar/navbar';
import { isPlatformBrowser } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ColNationalService } from '../../core/services/dashboard-services/col-national.service';


@Component({
  selector: 'app-col-national',
  imports: [Navbar, NgComponentOutlet, MatSelectModule, MatFormFieldModule],
  templateUrl: './col-national.html',
  styleUrl: './col-national.css',
})
export class ColNational {
  public dashboardService = inject(ColNationalService);

  availableYears = signal<number[]>([2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 
    2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  availableDomains = signal<string[]>(
    ['Nacional',
      'Cabeceras',
      'Centros poblados y rural disperso', 

    ]
  );

  availableDomains2 = signal<string[]>(
    ['Valle del Cauca',
      'Pacífica (sin incluir Valle del Cauca)',
      'Antioquia', 
      'Caribe',
      'Bogotá',
      'Oriental',
      'Central',
      'Orinoquia',
      'Orinoquía - Amazonia',
      'Bogotá (Cabecera)',
      'Pacífica',
    ]
  );

  year = signal<number>(2010);
  year2 = signal<number>(2010);
  year3 = signal<number>(2010);
  year4 = signal<number>(2010);
  domain = signal<string>('Nacional');
  domain2 = signal<string>('Valle del Cauca');
  domain3 = signal<string>('Caribe');
  domain4 = signal<string>('Bogotá');

  constructor() {
    effect(() => {
      const year = this.year();
      const year2 = this.year2();
      const year3 = this.year3();
      const year4 = this.year4();
      const domain = this.domain();
      const domain2 = this.domain2();
      const domain3 = this.domain3();
      const domain4 = this.domain4();

      this.dashboardService.loadIpmData(year);
      this.dashboardService.loadIntensityPovertyData(year2);
      this.dashboardService.loadPrivationsData(domain, year3);
      this.dashboardService.loadContributionsImpact(domain2, year4);
      this.dashboardService.loadIpmSexData(domain3);
      this.dashboardService.loadIpmBossSexData(domain4);
    });
  }
}
