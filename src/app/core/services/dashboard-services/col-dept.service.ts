import { Service, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PmiApiResponse, DeprivationsItem, WidgetItem, IncidencePersonItem } from '../../../interfaces/ipm.interface';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { MPHouseholdsDep } from '../../../pages/col-dept/widgets/mp-households-dep/mp-households-dep';


@Service()
export class ColDeptService {
    private httpClient = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);

    widgets = signal<WidgetItem[]>([
        { id: 1, label: 'Contribución relativa de las privaciones a la pobreza multidimensional', content: MPHouseholdsDep},

    ]);

    private indidence_url = `${environment.apiAddr}/api/users/filtered/multi`;
    data = signal<IncidencePersonItem[]>([]);

    loadIncidenceData(year: number, region: string) {
        if (!isPlatformBrowser(this.platformId)) return;

        const payload = {
            viewName: 'vw_incidence_by_household_head_sex',
            filters: [
                { columnName: 'anio', columnValue: String(year) },
                { columnName: 'region', columnValue: region }
            ]
        };

        this.httpClient.post<IncidencePersonItem[]>(this.indidence_url, payload).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                this.data.set(data);
            },

            error: (err) => console.error('Error al cargar datos IPM:', err),
        });
    }
}
