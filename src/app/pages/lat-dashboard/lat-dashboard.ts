import { Component, inject, input } from '@angular/core';
import { WidgetItem } from '../../models/dashboard/dashboard';
import { Widget } from '../../components/widget/widget';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-lat-dashboard',
  imports: [Widget],
  providers: [DashboardService],
  templateUrl: './lat-dashboard.html',
  styleUrl: './lat-dashboard.css',
})
export class LATDashboard {
  store = inject(DashboardService);

}
