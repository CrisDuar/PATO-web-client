import { Service, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PmiApiResponse, DeprivationsItem, WidgetItem, IntensityPovertyItem, ContributionPovertyItem, PopulationPovertyItem } from '../../../interfaces/ipm.interface';
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

    private contribution_url = `${environment.apiAddr}/api/users/filtered/multi`;
    contributionData = signal<ContributionPovertyItem[]>([]);

    loadContributionData(year: number, country: string) {
        if (!isPlatformBrowser(this.platformId)) return;

        const payload = {
            viewName: 'vw_dashboard03_national_poverty',
            filters: [
                { columnName: 'anio', columnValue: year },
                { columnName: 'pais', columnValue: country }
            ]
        };

        this.httpClient.post<ContributionPovertyItem[]>(this.contribution_url, payload).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                this.contributionData.set(data);
            },

            error: (err) => console.error('Error al cargar datos IPM:', err),
        });
    }

    private populatin_url = `${environment.apiAddr}/api/users/filtered/multi`;
    populationData = signal<PopulationPovertyItem[]>([]);

    loadPopulationPoveryData(year: number, country: string, area: string) {
        if (!isPlatformBrowser(this.platformId)) return;

        const payload = {
            viewName: 'vw_dashboard03_poverty_by_age',
            filters: [
                { columnName: 'anio', columnValue: year },
                { columnName: 'pais', columnValue: country },
                { columnName: 'area_geografica', columnValue: area }
            ]
        };

        this.httpClient.post<PopulationPovertyItem[]>(this.populatin_url, payload).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                this.populationData.set(data);
            },

            error: (err) => console.error('Error al cargar datos IPM:', err),
        });
    }


}
