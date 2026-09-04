import { Service, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PmiApiResponse, DeprivationsItem, WidgetItem, IntensityPovertyItem } from '../../../interfaces/ipm.interface';
import { environment } from '../../../../environments/environment.development';
import { RadarDeprivations } from '../../../pages/col-national/widgets/radar-deprivations/radar-deprivations';
import { isPlatformBrowser } from '@angular/common';
import { IntensityPoverty } from '../../../pages/col-national/widgets/intensity-poverty/intensity-poverty';
import { ContributionsImpact } from '../../../pages/col-national/widgets/contributions-impact/contributions-impact';
import { Mpi } from '../../../pages/col-national/widgets/mpi/mpi';
import { MpiSex } from '../../../pages/col-national/widgets/mpi-sex/mpi-sex';
import { MpiBossSex } from '../../../pages/col-national/widgets/mpi-boss-sex/mpi-boss-sex';
import { ContributionDeprivations } from '../../../pages/latin-america/widgets/contribution-deprivations/contribution-deprivations';
import { PopulationPoverty } from '../../../pages/latin-america/widgets/population-poverty/population-poverty';
@Service()
export class LatinAmericaService {
    private httpClient = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);

    widgets = signal<WidgetItem[]>([
        { id: 1, label: 'Contribución relativa de las privaciones a la pobreza multidimensional', content: ContributionDeprivations },
        { id: 2, label: 'Población en situación de pobreza multidimensional (cifras nacionales)', content: PopulationPoverty },

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

    private DEPRIVATIONS_URL = `${environment.apiAddr}/api/users/deprivations-by-variable`;
    deprivationsData = signal<DeprivationsItem[]>([]);

    loadPrivationsData(domain = 'Nacional', year: number | string = 2010) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.httpClient.get<DeprivationsItem[]>(this.DEPRIVATIONS_URL).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                // Filtrar TODAS las variables para ese dominio y año
                const filtered = data.filter(
                    (d) =>
                        d.dominio?.toLowerCase().trim() === String(domain).toLowerCase().trim() &&
                        Number(d.anio) === Number(year)
                );

                // Si hay coincidencias se guarda la lista, si no, fallback a los primeros datos
                this.deprivationsData.set(filtered.length > 0 ? filtered : data);
            },
            error: (err) => console.error('Error al cargar privaciones:', err),
        });
    }
}
