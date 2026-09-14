import { Component, inject, signal, effect } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Widget } from '../../components/widget/widget';
import { Navbar } from '../../components/navbar/navbar';
import { isPlatformBrowser } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ColDeptService } from '../../core/services/dashboard-services/col-dept.service';
import { NavbarDashboard } from '../../components/navbar-dashboard/navbar-dashboard';

@Component({
  selector: 'app-col-dept',
  imports: [Navbar, NavbarDashboard, NgComponentOutlet, MatSelectModule, MatFormFieldModule],
  templateUrl: './col-dept.html',
  styleUrl: './col-dept.css',
})
export class ColDept {
  public dashboardService = inject(ColDeptService);

  years = signal<number[]>([2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
    2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  areas = signal<string[]>(
    ['Nacional',
      'Rural',

    ]
  );

  regions = signal<string[]>(
    ['Andina',
      'Caribe',
      'Pacífica',
      'Orinoquía',
      'Amazonia',
      'Insular',
    ]
  );

  depts = signal<string[]>(
    ['Amazonias',
      'Antioquia',
      'Arauca',
      'Atlántico',
      'Bolivar',
      'Boyacá',
    ]
  );

  year = signal<number>(2010);
  region = signal<string>('Orinoquía');
  dept = signal<string>('Arauca');

  constructor() {
    effect(() => {
      const year = this.year();
      const region = this.region();
      const dept= this.dept();

      this.dashboardService.loadIncidenceData(year, region);

    })
  }
}
