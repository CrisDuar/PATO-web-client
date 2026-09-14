import { Component, inject, signal, effect } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Widget } from '../../components/widget/widget';
import { Navbar } from '../../components/navbar/navbar';
import { isPlatformBrowser } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LatinAmericaService } from '../../core/services/dashboard-services/latin-america.service';
import { NavbarDashboard } from '../../components/navbar-dashboard/navbar-dashboard';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-latin-america',
  imports: [FormsModule, Navbar, NavbarDashboard, NgComponentOutlet, MatSelectModule, MatFormFieldModule],
  templateUrl: './latin-america.html',
  styleUrl: './latin-america.css',
})
export class LatinAmerica {
  public dashboardService = inject(LatinAmericaService);

  years = signal<number[]>([2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
    2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  areas = signal<string[]>(
    [
      'Nacional',
      'Rural',

    ]
  );

  countries = signal<string[]>(
    [
      'Dominican Republic',
      'Brazil',
      'Mexico',
      'Ecuador',
      'Argentina',
      'Bolivia (Plurinational State of)',
      'Paraguay',
      'Costa Rica',
      'Uruguay',
      'Colombia',
      'Latin America (simple average)',
      'Peru',
      'Latin America (weighted average)',
    ]
  );

  year = signal<number>(2023);
  country = signal<string>('Ecuador');

  year2 = signal<number>(2025);
  area = signal<string>('National');
  country2 = signal<string>('Colombia');

  year3 = signal<number>(2024);
  country3 = signal<string>('Colombia');
  area2 = signal<string>('Rural');


  constructor() {
    effect(() => {
      const year = this.year();
      const year2 = this.year2();
      const year3 = this.year3();
      const country = this.country();
      const country2 = this.country2();
      const country3 = this.country3();
      const area = this.area();
      const area2 = this.area2();

      this.dashboardService.loadDeprivationContributionData(year, country)
      this.dashboardService.loadNationalPovertyData(year2, country2, area);
      this.dashboardService.loadPovertyByAgeData(year3, country3, area2);

    });
  }

}
