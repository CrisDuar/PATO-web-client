import { Component, inject, signal, effect } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Widget } from '../../components/widget/widget';
import { Navbar } from '../../components/navbar/navbar';
import { isPlatformBrowser } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ColNationalService } from '../../core/services/dashboard-services/col-national.service';
import { NavbarDashboard } from '../../components/navbar-dashboard/navbar-dashboard';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-col-national',
  imports: [FormsModule, Navbar, NavbarDashboard, NgComponentOutlet, MatSelectModule, MatFormFieldModule],
  templateUrl: './col-national.html',
  styleUrl: './col-national.css',
})
export class ColNational {
  public dashboardService = inject(ColNationalService);

  year = signal<number>(2024);
  year2 = signal<number>(2025);
  year3 = signal<number>(2025);
  year4 = signal<number>(2025);
  domain = signal<string>('Nacional');
  domain2 = signal<string>('Oriental');
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
