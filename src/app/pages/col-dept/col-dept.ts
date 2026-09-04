import { Component, inject, signal, effect } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Widget } from '../../components/widget/widget';
import { Navbar } from '../../components/navbar/navbar';
import { DashboardService } from '../../core/services/dashboard.service';
import { isPlatformBrowser } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ColDeptService } from '../../core/services/dashboard-services/col-dept.service';

@Component({
  selector: 'app-col-dept',
  imports: [Navbar, NgComponentOutlet, MatSelectModule, MatFormFieldModule],
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

  selectedYear = signal<number>(2010);
  selectedRegion = signal<string>('Orinoquía');
  selectedDept = signal<string>('Arauca');

  constructor() {
  }
}
