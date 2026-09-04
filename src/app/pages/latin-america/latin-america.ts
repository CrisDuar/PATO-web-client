import { Component, inject, signal, effect } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Widget } from '../../components/widget/widget';
import { Navbar } from '../../components/navbar/navbar';
import { DashboardService } from '../../core/services/dashboard.service';
import { isPlatformBrowser } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LatinAmericaService } from '../../core/services/dashboard-services/latin-america.service';

@Component({
  selector: 'app-latin-america',
  imports: [Navbar, NgComponentOutlet, MatSelectModule, MatFormFieldModule],
  templateUrl: './latin-america.html',
  styleUrl: './latin-america.css',
})
export class LatinAmerica {
  public dashboardService = inject(LatinAmericaService);

  years = signal<number[]>([2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
    2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  areas = signal<string[]>(
    ['Nacional',
      'Rural',

    ]
  );

  countries = signal<string[]>(
    ['Antigua y Barbuda',
      'Argentina',
      'Bahamas',
      'Barbados',
      'Belice',
      'Bolivia',
      'Brazil',
      'Brasil',
      'Colombia',
    ]
  );

  selectedYear = signal<number>(2010);
  selectedYear2 = signal<number>(2010);
  selectedCountry = signal<string>('Colombia');
  selectedCountry2 = signal<string>('Colombia');
  selectedArea = signal<string>('Nacional');

  constructor() {
  }

}
