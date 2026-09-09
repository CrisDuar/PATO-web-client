import { Component, inject, model, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LocationService } from '../../core/services/location.service';
import { GeoDataService } from '../../core/services/geo-data-service';

export interface IpmSelection {
  year: number | null;
  deprivation: string[];
  source: 'dane' | 'cepal';
}

export interface LocationSelection {
  pais: string | null;
  region: string | null;        // solo aplica si pais === 'Colombia'
  departamento: string | null;  // solo aplica si pais === 'Colombia'
}

export interface MapSelection {
  locations: LocationSelection[];
  ipm: IpmSelection;
  domain: 'national' | 'international';
  granularity: 'country' | 'region' | 'department';
}

@Component({
  selector: 'app-sidebar-map',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './sidebar-map.html',
  styleUrl: './sidebar-map.css',
})

export class Sidebar {
  readonly locationService = inject(LocationService);
  

  readonly status = this.locationService.status;
  readonly regions = this.locationService.regionNames;
  readonly departamentos = this.locationService.departmentsForSelectedRegion;

  paises = signal<string[]>([]);
  readonly years = Array.from({ length: 16 }, (_, index) => 2010 + index);
  readonly daneDeprivations = [
    'Privación por analfabetismo',
    'Privación por inasistencia escolar',
    'Privación por atención integral a la primera infancia',
    'Privación por trabajo infantil',
    'Privación por no aseguramiento en salud',
    'Privación por barreras de acceso a salud',
    'Privación por desempleo de larga duración',
    'Privación por tasa de empleo formal',
    'Privación por no acceso a fuente de agua mejorada',
    'Privación por inadecuada eliminación de excretas',
    'Privación por inadecuado material de pisos',
    'Privación por inadecuado material de paredes exteriores',
    'Privación por hacinamiento crítico',
  ];
  readonly cepalDeprivations = [
    'Privación por educación',
    'Privación por salud',
    'Privación por vivienda',
    'Privación por empleo',
    'Privación por protección social',
  ];
  readonly deprivationLabels: Record<string, string> = {
    'Privación por analfabetismo': 'Analfabetismo',
    'Privación por inasistencia escolar': 'Inasistencia escolar',
    'Privación por atención integral a la primera infancia': 'Atención a primera infancia',
    'Privación por trabajo infantil': 'Trabajo infantil',
    'Privación por no aseguramiento en salud': 'Sin aseguramiento en salud',
    'Privación por barreras de acceso a salud': 'Barreras de acceso a salud',
    'Privación por desempleo de larga duración': 'Desempleo de larga duración',
    'Privación por tasa de empleo formal': 'Empleo formal',
    'Privación por no acceso a fuente de agua mejorada': 'Agua no mejorada',
    'Privación por inadecuada eliminación de excretas': 'Eliminación de excretas',
    'Privación por inadecuado material de pisos': 'Material de pisos',
    'Privación por inadecuado material de paredes exteriores': 'Material de paredes',
    'Privación por hacinamiento crítico': 'Hacinamiento crítico',
    'Privación por educación': 'Educación',
    'Privación por salud': 'Salud',
    'Privación por vivienda': 'Vivienda',
    'Privación por empleo': 'Empleo',
    'Privación por protección social': 'Protección social',
  };

  selectedYear = model<number>(2020);
  selectedDeprivations = model<string[]>([]);
  mode = signal<'local' | 'international'>('local');
  localLevel = signal<'region' | 'department'>('region');
  deprivationSource = signal<'dane' | 'cepal'>('dane');

  selection = input<MapSelection | null>(null);
  selectionChange = output<MapSelection>();

  get activeDeprivations(): string[] {
    return this.deprivationSource() === 'dane'
      ? this.daneDeprivations
      : this.cepalDeprivations;
  }

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

  onCountryChange(index: number, pais: string | null): void {
    this.updateLocation(index, { pais, region: null, departamento: null });

    this.locationService.selectRegion(null);
    this.locationService.selectDepartment(null);
    this.emitSelection();
  }

  onModeChange(mode: 'local' | 'international'): void {
    this.mode.set(mode);
    this.selectedDeprivations.set([]);

    if (mode === 'local') {
      this.localLevel.set('region');
      this.replaceLocations([{ pais: 'Colombia', region: null, departamento: null }]);
    } else {
      this.replaceLocations([this.emptyLocation()]);
    }

    this.locationService.selectRegion(null);
    this.locationService.selectDepartment(null);
    this.emitSelection();
  }

  onModeSelection(mode: 'local' | 'international'): void {
    if (mode !== this.mode()) {
      this.onModeChange(mode);
    }
  }

  onLocalLevelChange(level: 'region' | 'department'): void {
    this.localLevel.set(level);
    this.replaceLocations([{ pais: 'Colombia', region: null, departamento: null }]);
    this.locationService.selectRegion(null);
    this.locationService.selectDepartment(null);
    this.emitSelection();
  }

  onLevelSelection(level: 'region' | 'department'): void {
    if (level !== this.localLevel()) {
      this.onLocalLevelChange(level);
    }
  }

  onSourceChange(source: 'dane' | 'cepal'): void {
    this.deprivationSource.set(source);
    this.selectedDeprivations.set([]);
    this.emitSelection();
  }

  addLocation(): void {
    const location = this.mode() === 'local'
      ? { pais: 'Colombia', region: null, departamento: null }
      : this.emptyLocation();
    this.updateLocations(locations => [...locations, location]);
  }

  removeLocation(index: number): void {
    if (this.selection()?.locations.length === 1) return;
    this.updateLocations(locations => locations.filter((_, locationIndex) => locationIndex !== index));
  }

  onYearChange(year: number): void {
    this.selectedYear.set(year);
    this.emitSelection();
  }

  onDeprivationChange(deprivation: string): void {
    const selected = this.selectedDeprivations();
    const next = selected.includes(deprivation)
      ? selected.filter(item => item !== deprivation)
      : [...selected, deprivation];

    this.selectedDeprivations.set(next);
    this.emitSelection();
  }

  onRegionChange(index: number, region: string | null): void {
    this.updateLocation(index, { region, departamento: null });

    this.locationService.selectRegion(region);
    this.emitSelection();
  }

  onDepartmentChange(index: number, code: string | null): void {
    this.updateLocation(index, { departamento: code });
    this.locationService.selectDepartment(code);
    this.emitSelection();
  }

  isDeprivationSelected(deprivation: string): boolean {
    return this.selectedDeprivations().includes(deprivation);
  }

  private getLocation(index: number): LocationSelection {
    return this.selection()?.locations[index] ?? {
      pais: null,
      region: null,
      departamento: null,
    };
  }

  private emptyLocation(): LocationSelection {
    return { pais: null, region: null, departamento: null };
  }

  private replaceLocations(locations: LocationSelection[]): void {
    this.updateLocations(() => locations);
  }

  private updateLocations(update: (locations: LocationSelection[]) => LocationSelection[]): void {
    const locations = update([...(this.selection()?.locations ?? [this.emptyLocation()])]);
    this.selectionChange.emit({
      locations,
      domain: this.mode() === 'local' ? 'national' : 'international',
      granularity: this.mode() === 'local'
        ? (this.localLevel() === 'region' ? 'region' : 'department')
        : 'country',
      ipm: {
        year: this.selectedYear(),
        deprivation: this.selectedDeprivations(),
        source: this.deprivationSource(),
      },
    });
  }

  private updateLocation(index: number, changes: Partial<LocationSelection>): void {
    this.updateLocations(locations => {
      locations[index] = { ...locations[index], ...changes };
      return locations;
    });
  }

  private emitSelection(): void {
    this.updateLocations(locations => locations);
  }
}