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

  year = signal<number>(2023);
  region = signal<string>('Caribe');
  dept = signal<string>('Arauca');

  constructor() {
    effect(() => {
      const year = this.year();
      const region = this.region();
      const dept= this.dept();

      this.dashboardService.loadNationalPovertyData(year, region, dept);

    })
  }
}
