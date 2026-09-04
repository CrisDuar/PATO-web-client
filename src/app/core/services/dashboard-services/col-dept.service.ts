import { Service, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PmiApiResponse, DeprivationsItem, WidgetItem } from '../../../interfaces/ipm.interface';
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

    private IPM_URL = `${environment.apiAddr}/api/users/ipm-by-domain`;
    pmiData = signal<PmiApiResponse[]>([]);

    loadIpmData(year: number | string = 2012) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.httpClient.get<PmiApiResponse[]>(this.IPM_URL).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                // Filtrar los dominios que pertenecen al año seleccionado
                const filteredData = data.filter(
                    (d) => Number(d.anio) === Number(year)
                );

                this.pmiData.set(filteredData);
            },
            error: (err) => console.error('Error al cargar datos IPM:', err),
        });
    }
}
