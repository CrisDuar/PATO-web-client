import { Service, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PmiApiResponse, DeprivationsItem, WidgetItem, IntensityPovertyItem, ContributionPovertyItem, NationalPovertyItem, PovertyByAgeItem } from '../../../interfaces/ipm.interface';
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
import { PovertyByAge } from '../../../pages/latin-america/widgets/poverty-by-age/poverty-by-age';
@Service()
export class LatinAmericaService {
    private httpClient = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);

    widgets = signal<WidgetItem[]>([
        { id: 1, label: 'Contribución relativa de las privaciones a la pobreza multidimensional', content: ContributionDeprivations },
        { id: 2, label: 'Población en situación de pobreza multidimensional (cifras nacionales)', content: PopulationPoverty },
        { id: 3, label: 'Incidencia de la pobreza multidimensional por grupo de edad y área', content: PovertyByAge },

    ]);

    private contribution_url = `${environment.apiAddr}/api/users/deprivations-contribution`;
    deprivationContributionData = signal<ContributionPovertyItem[]>([]);
    constributionYears = signal<number[]>([]);
    constributionCountries = signal<string[]>([]);

    loadDeprivationContributionData(year: number, country: string) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.httpClient.get<ContributionPovertyItem[]>(this.contribution_url).subscribe({
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
                            .map((d) => d.pais?.trim())
                            .filter(Boolean) as string[]
                    ),
                ];
                this.constributionCountries.set(domainsForSelectedYear);

                // Filtrar los datos por año y dominio
                const filteredData = data.filter(
                    (d) =>
                        Number(d.anio) === Number(year) &&
                        d.pais?.toLowerCase().trim() === String(country).toLowerCase().trim()
                );

                // Si hay coincidencias se guarda la lista, si no, fallback a los primeros datos
                this.deprivationContributionData.set(filteredData.length > 0 ? filteredData : data);
            },

            error: (err) => console.error('Error al cargar datos IPM:', err),
        });
    }

    private national_poverty_url = `${environment.apiAddr}/api/users/national-poverty`;
    nationalPovertyData = signal<NationalPovertyItem[]>([]);
    nationalPovertyYears = signal<number[]>([]);
    nationalPovertyAreas = signal<string[]>([]);
    nationalPovertyCountries = signal<string[]>([]);

    loadNationalPovertyData(year: number, country: string, area: string) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.httpClient.get<NationalPovertyItem[]>(this.national_poverty_url).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                // Extraer todos los años
                const years = [...new Set(data.map((d) => Number(d.anio)))].sort((a, b) => b - a);
                this.nationalPovertyYears.set(years);

                // Extraer las areas que pertenecen al año seleccionado
                const availableAreas = [
                    ...new Set(
                        data
                            .filter((d) => Number(d.anio) === Number(year))
                            .map((d) => d.area_geografica?.trim())
                            .filter(Boolean) as string[]
                    ),
                ].sort();
                this.nationalPovertyAreas.set(availableAreas);

                // Extraer los países que pertenecen al área seleccionada
                const availableCountries = [
                    ...new Set(
                        data
                            .filter(
                                (d) =>
                                    Number(d.anio) === Number(year) &&
                                    d.area_geografica?.toLowerCase().trim() === area?.toLowerCase().trim()
                            )
                            .map((d) => d.pais?.trim())
                            .filter(Boolean) as string[]
                    ),
                ].sort();
                this.nationalPovertyCountries.set(availableCountries);

                // Filtrar los datos por año, area y país
                const filteredData = data.filter(
                    (d) =>
                        Number(d.anio) === Number(year) &&
                        d.area_geografica?.toLowerCase().trim() === area?.toLowerCase().trim() &&
                        d.pais?.toLowerCase().trim() === country?.toLowerCase().trim()
                );

                // Se asignan los datos filtrados finales
                this.nationalPovertyData.set(filteredData);
            },

            error: (err) => console.error('Error al cargar datos IPM:', err),
        });
    }

    private poverty_url = `${environment.apiAddr}/api/users/poverty-by-age`;
    povertyData = signal<PovertyByAgeItem[]>([]);
    povertyYears = signal<number[]>([]);
    povertyAreas = signal<string[]>([]);
    povertyCountries = signal<string[]>([]);

    loadPovertyByAgeData(year: number, country: string, area: string) {
        if (!isPlatformBrowser(this.platformId)) return;

        this.httpClient.get<PovertyByAgeItem[]>(this.poverty_url).subscribe({
            next: (data) => {
                if (!data || data.length === 0) return;

                // Extraer todos los años
                const years = [...new Set(data.map((d) => Number(d.anio)))].sort((a, b) => b - a);
                this.povertyYears.set(years);

                // Extraer las areas que pertenecen al año seleccionado
                const availableAreas = [
                    ...new Set(
                        data
                            .filter((d) => Number(d.anio) === Number(year))
                            .map((d) => d.area_geografica?.trim())
                            .filter(Boolean) as string[]
                    ),
                ].sort();
                this.povertyAreas.set(availableAreas);

                // Extraer los países que pertenecen al área seleccionada
                const availableCountries = [
                    ...new Set(
                        data
                            .filter(
                                (d) =>
                                    Number(d.anio) === Number(year) &&
                                    d.area_geografica?.toLowerCase().trim() === area?.toLowerCase().trim()
                            )
                            .map((d) => d.pais?.trim())
                            .filter(Boolean) as string[]
                    ),
                ].sort();
                this.povertyCountries.set(availableCountries);

                // Filtrar los datos por año, area y país
                const filteredData = data.filter(
                    (d) =>
                        Number(d.anio) === Number(year) &&
                        d.area_geografica?.toLowerCase().trim() === area?.toLowerCase().trim() &&
                        d.pais?.toLowerCase().trim() === country?.toLowerCase().trim()
                );

                // Se asignan los datos filtrados finales
                this.povertyData.set(filteredData);
            },

            error: (err) => console.error('Error al cargar datos IPM:', err),
        });
    }


}
