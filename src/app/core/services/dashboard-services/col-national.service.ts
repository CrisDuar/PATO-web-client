import { Service, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PmiApiResponse, DeprivationsItem, WidgetItem, IntensityPovertyItem, ContributionImpactItem, MpiSexItem, MpiBossSexItem } from '../../../interfaces/ipm.interface';
import { environment } from '../../../../environments/environment.development';
import { RadarDeprivations } from '../../../pages/col-national/widgets/radar-deprivations/radar-deprivations';
import { isPlatformBrowser } from '@angular/common';
import { IntensityPoverty } from '../../../pages/col-national/widgets/intensity-poverty/intensity-poverty';
import { ContributionsImpact } from '../../../pages/col-national/widgets/contributions-impact/contributions-impact';
import { Mpi } from '../../../pages/col-national/widgets/mpi/mpi';
import { MpiSex } from '../../../pages/col-national/widgets/mpi-sex/mpi-sex';
import { MpiBossSex } from '../../../pages/col-national/widgets/mpi-boss-sex/mpi-boss-sex';

@Service()
export class ColNationalService {
    private httpClient = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);

    widgets = signal<WidgetItem[]>([
        { id: 1, label: 'INCIDENCIA IPM', content: Mpi },
        { id: 2, label: 'Privaciones por hogar', content: RadarDeprivations },
        { id: 3, label: 'Incidencia de Pobreza Multidimensioanl según sexo de la persona ', content: MpiSex },
        { id: 4, label: 'Proporción de privaciones entre las personas en situación de Pobreza Multidimensional', content: IntensityPoverty },
        { id: 5, label: 'Contribuciones a la incidencia Ajustada del IPM', content: ContributionsImpact },
        { id: 6, label: 'Incidencia de Pobreza Multidimensioanl según sexo del jefe del hogar', content: MpiBossSex },

    ]);

    private IPM_URL = `${environment.apiAddr}/api/users/ipm-by-domain`;
    pmiData = signal<PmiApiResponse[]>([]);
    pmiYears = signal<number[]>([]);

    loadIpmData(year: number | string = 2012) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.httpClient.get<PmiApiResponse[]>(this.IPM_URL).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                // Extraer todos los años 
                const years = [...new Set(data.map((d) => Number(d.anio)))].sort((a, b) => b - a);
                this.pmiYears.set(years);

                // Filtrar los datos para el año que viene por parámetro
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
    deprivationYears = signal<number[]>([]);
    deprivationDomains = signal<string[]>([]);

    loadPrivationsData(domain = 'Nacional', year: number | string = 2010) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.httpClient.get<DeprivationsItem[]>(this.DEPRIVATIONS_URL).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                const years = [...new Set(data.map((d) => Number(d.anio)))].sort((a, b) => b - a);
                this.deprivationYears.set(years);

                const domainsForSelectedYear = [
                    ...new Set(
                        data
                            .filter((d) => Number(d.anio) === Number(year))
                            .map((d) => d.dominio?.trim())
                            .filter(Boolean) as string[]
                    ),
                ];
                this.deprivationDomains.set(domainsForSelectedYear);

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

    private INTENSITY_POVERTY_URL = `${environment.apiAddr}/api/users/average-deprivations`;
    intensityPovertyData = signal<IntensityPovertyItem[]>([]);
    intensityYears = signal<number[]>([]);

    loadIntensityPovertyData(year: number | string = 2012) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.httpClient.get<IntensityPovertyItem[]>(this.INTENSITY_POVERTY_URL).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                // Extraer todos los años 
                const years = [...new Set(data.map((d) => Number(d.anio)))].sort((a, b) => b - a);
                this.intensityYears.set(years);

                // Filtrar los datos para el año que viene por parámetro
                const filteredData = data.filter(
                    (d) => Number(d.anio) === Number(year)
                );

                this.intensityPovertyData.set(filteredData);
            },
            error: (err) => console.error('Error al cargar datos IPM:', err),
        });

    }

    contributionImpactData = signal<ContributionImpactItem[]>([]);
    private constribution_URL = `${environment.apiAddr}/api/users/dimension-contribution`;
    constributionYears = signal<number[]>([]);
    constributionDomains = signal<string[]>([]);

    loadContributionsImpact(domain: string, year: number | string) {
        if (!isPlatformBrowser(this.platformId)) return;
        this.httpClient.get<ContributionImpactItem[]>(this.constribution_URL).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                // Extraer todos los años
                const years = [...new Set(data.map((d) => Number(d.anio)))].sort((a, b) => b - a);
                this.constributionYears.set(years);

                // Extraer los dominios únicos que pertenecen al año seleccionado
                const domainsForSelectedYear = [
                    ...new Set(
                        data
                            .filter((d) => Number(d.anio) === Number(year))
                            .map((d) => d.dominio?.trim())
                            .filter(Boolean) as string[]
                    ),
                ];
                this.constributionDomains.set(domainsForSelectedYear);

                // Filtrar los datos por año y dominio
                const filteredData = data.filter(
                    (d) =>
                        Number(d.anio) === Number(year) &&
                        d.dominio?.toLowerCase().trim() === String(domain).toLowerCase().trim()
                );

                // Si hay coincidencias se guarda la lista, si no, fallback a los primeros datos
                this.contributionImpactData.set(filteredData.length > 0 ? filteredData : data);
            },

            error: (err) => console.error('Error al cargar contribuciones:', err),

        });
    }

    private mpi_sex_url = `${environment.apiAddr}/api/users/incidence-by-person-sex`;
    mpiSexData = signal<MpiSexItem[]>([]);
    mpiSexDomains = signal<string[]>([]);

    loadIpmSexData(domain: string) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.httpClient.get<MpiSexItem[]>(this.mpi_sex_url).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                // Extraer todos los dominios únicos 
                const domains = [
                    ...new Set(
                        data
                            .map((d) => d.dominio?.trim())
                            .filter(Boolean) as string[]
                    ),
                ].sort();

                this.mpiSexDomains.set(domains);

                // Filtrar los datos correspondientes al dominio recibido por parámetro
                const filteredData = data.filter(
                    (d) => d.dominio?.toLowerCase().trim() === String(domain).toLowerCase().trim()
                );

                // Si hay coincidencias se guarda la lista, si no, fallback a los primeros datos
                this.mpiSexData.set(filteredData.length > 0 ? filteredData : data);
            },
            error: (err) => console.error('Error al cargar datos IPM:', err),
        });
    }

    private mpi_boss_sex_url = `${environment.apiAddr}/api/users/incidence-by-household-head-sex`;
    mpiBossSexData = signal<MpiBossSexItem[]>([]);
    mpiBossDomains = signal<string[]>([]);

    loadIpmBossSexData(domain: string) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.httpClient.get<MpiBossSexItem[]>(this.mpi_boss_sex_url).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                // Extraer todos los dominios únicos 
                const domains = [
                    ...new Set(
                        data
                            .map((d) => d.dominio?.trim())
                            .filter(Boolean) as string[]
                    ),
                ].sort();

                this.mpiBossDomains.set(domains);

                // Filtrar los datos correspondientes al dominio recibido por parámetro
                const filteredData = data.filter(
                    (d) => d.dominio?.toLowerCase().trim() === String(domain).toLowerCase().trim()
                );

                // Si hay coincidencias se guarda la lista, si no, fallback a los primeros datos
                this.mpiBossSexData.set(filteredData.length > 0 ? filteredData : data);
            },
            error: (err) => console.error('Error al cargar datos IPM:', err),
        });
    }

}
