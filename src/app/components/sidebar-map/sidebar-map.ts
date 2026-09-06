import { Component, inject, model, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../core/services/location.service';
import { GeoDataService } from '../../core/services/geo-data-service';

interface Indicator {
  key: string;
  label: string;
} 

interface IndicatorGroup {
  title: string;
  items: Indicator[];
}

export interface LocationSelection {
  pais: string | null;
  region: string | null;        // solo aplica si pais === 'Colombia'
  departamento: string | null;  // solo aplica si pais === 'Colombia'
}

@Component({
  selector: 'app-sidebar-map',
  imports: [FormsModule],
  templateUrl: './sidebar-map.html',
  styleUrl: './sidebar-map.css',
})

export class Sidebar {
  readonly locationService = inject(LocationService);
  

  readonly status = this.locationService.status;
  readonly regions = this.locationService.regionNames;
  readonly departamentos = this.locationService.departmentsForSelectedRegion;

  paises = signal<string[]>([]);

  selectedPais = model<string | null>(null);
  selectedDepartamento = model<string | null>(null);
  selectedRegion = model<string | null>(null);

  location = input<LocationSelection | null>(null);
  locationChange = output<LocationSelection>();

  constructor(
    private geoDataService: GeoDataService
  ) {
    this.locationService.load();

    this.geoDataService.getCountries().subscribe({
      next: (geojson) => {
        const countries = geojson.features
          .map((feature) => feature.properties?.['name'])
          .filter((name): name is string => typeof name === 'string')
          .sort((a, b) => a.localeCompare(b));

        this.paises.set(countries);
      },
      error: (error) => {
        console.error('Error cargando países', error);
      },
    });
  }

  onCountryChange(pais: string | null): void {
    this.selectedPais.set(pais);
    this.selectedRegion.set(null);
    this.selectedDepartamento.set(null);

    this.locationService.selectRegion(null);
    this.locationService.selectDepartment(null);
    this.emitLocation();
  }

  onRegionChange(region: string | null): void {
    this.selectedRegion.set(region);
    this.selectedDepartamento.set(null);

    this.locationService.selectRegion(region);
    this.emitLocation();
  }

  onDepartmentChange(code: string | null): void {
    this.selectedDepartamento.set(code);
    this.locationService.selectDepartment(code);
    this.emitLocation();
  }
  private emitLocation(): void {
    this.locationChange.emit({
      pais: this.selectedPais(),
      region: this.selectedRegion(),
      departamento: this.selectedDepartamento(),
    });
  }
}