import { Service, signal, WritableSignal } from '@angular/core';
import { WidgetItem } from '../models/dashboard/dashboard';
import { InternetAccess } from '../pages/lat-dashboard/widgets/internet-access/internet-access';


@Service()
export class DashboardService {
    widgets: WritableSignal<WidgetItem[]> = signal([
        {
            id: 1,
            label: 'Acceso a internet',
            content: InternetAccess,
        },
    ]);

    constructor(){}
}