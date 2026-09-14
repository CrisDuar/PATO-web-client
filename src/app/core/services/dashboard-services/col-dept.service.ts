import { Service, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PmiApiResponse, DeprivationsItem, WidgetItem, IndicatorDeptItem } from '../../../interfaces/ipm.interface';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { MPHouseholdsDep } from '../../../pages/col-dept/widgets/mp-households-dep/mp-households-dep';


@Service()
export class ColDeptService {
    private httpClient = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);

    widgets = signal<WidgetItem[]>([
        { id: 1, label: 'Contribución relativa de las privaciones a la pobreza multidimensional', content: MPHouseholdsDep },

    ]);

    private national_poverty_url = `${environment.apiAddr}/api/users/household-poverty-by-department`;
    indicatorsDeptData = signal<IndicatorDeptItem[]>([]);
    indicatorsDeptYears = signal<number[]>([]);
    indicatorsDeptRegions = signal<string[]>([]);
    indicatorsDeptDepts = signal<string[]>([]);

    loadNationalPovertyData(year: number, region: string, dept: string) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.httpClient.get<IndicatorDeptItem[]>(this.national_poverty_url).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                // Extraer todos los años
                const years = [...new Set(data.map((d) => Number(d.anio)))].sort((a, b) => b - a);
                this.indicatorsDeptYears.set(years);

                // Extraer las regiones que pertenecen al año seleccionado
                const availableRegions = [
                    ...new Set(
                        data
                            .filter((d) => Number(d.anio) === Number(year))
                            .map((d) => d.region?.trim())
                            .filter(Boolean) as string[]
                    ),
                ].sort();
                this.indicatorsDeptRegions.set(availableRegions);

                // Extraer los departamentos que pertenecen a la región seleccionada
                const availableDepts = [
                    ...new Set(
                        data
                            .filter(
                                (d) =>
                                    Number(d.anio) === Number(year) &&
                                    d.region?.toLowerCase().trim() === region?.toLowerCase().trim()
                            )
                            .map((d) => d.departamento?.trim())
                            .filter(Boolean) as string[]
                    ),
                ].sort();
                this.indicatorsDeptDepts.set(availableDepts);

                // Filtrar los datos por año, región y departamento
                const filteredData = data.filter(
                    (d) =>
                        Number(d.anio) === Number(year) &&
                        d.region?.toLowerCase().trim() === region?.toLowerCase().trim() &&
                        d.departamento?.toLowerCase().trim() === dept?.toLowerCase().trim()
                );

                // Se asignan los datos filtrados finales
                this.indicatorsDeptData.set(filteredData);
            },

            error: (err) => console.error('Error al cargar datos IPM:', err),
        });
    }
}
