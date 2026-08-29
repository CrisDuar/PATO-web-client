import { Component, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard';
import { Widget } from '../../components/widget/widget';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-col-national',
  imports: [Widget, Navbar],
  templateUrl: './col-national.html',
  styleUrl: './col-national.css',
})
export class ColNational {
  store = inject(DashboardService);
}
