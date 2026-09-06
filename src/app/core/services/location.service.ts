import { Injectable, signal, computed, inject } from '@angular/core';
import * as turf from '@turf/turf';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import { GeoDataService } from './geo-data-service';

export interface GeoRegion {
  name: string;
  feature: Feature;
}

export interface GeoDepartment {
  code: string;        // DPTO
  name: string;         // NOMBRE_DPT, tal cual llega
  feature: Feature;
  regionName: string | null; // calculado
}

export interface GeoCountry {
  name: string;
  feature: Feature;
}

const dptName = 'NOMBRE_DPT';
const dptCode = 'DPTO';

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

@Injectable({ providedIn: 'root' })
export class LocationService {
  private geoDataService = inject(GeoDataService);

  private readonly _status = signal<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  private readonly _error = signal<string | null>(null);
  private readonly _regions = signal<GeoRegion[]>([]);
  private readonly _departments = signal<GeoDepartment[]>([]);

  readonly status = this._status.asReadonly();
  readonly error = this._error.asReadonly();

  // Selección
  readonly selectedRegion = signal<string | null>(null);
  readonly selectedDepartmentCode = signal<string | null>(null);

  // Derivados públicos, deduplicados por nombre normalizado
  readonly regionNames = computed(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const r of this._regions()) {
      const key = normalize(r.name);
      if (!seen.has(key)) { seen.add(key); out.push(r.name); }
    }
    return out.sort((a, b) => a.localeCompare(b));
  });

  readonly departmentsForSelectedRegion = computed(() => {
    const region = this.selectedRegion();
    const all = this._departments();
    const filtered = region ? all.filter(d => d.regionName === region) : all;

    const seen = new Set<string>();
    const out: GeoDepartment[] = [];
    for (const d of filtered) {
      const key = normalize(d.name);
      if (!seen.has(key)) { seen.add(key); out.push(d); }
    }
    return out.sort((a, b) => a.name.localeCompare(b.name));
  });

  readonly regionFeatures = computed(() => this._regions());
  readonly departmentFeatures = computed(() =>
    this.selectedRegion()
      ? this._departments().filter(d => d.regionName === this.selectedRegion())
      : this._departments()
  );

  load(): void {
    if (this._status() !== 'idle') return; // evita cargas duplicadas
    this._status.set('loading');

    this.geoDataService.getColombiaRegions().subscribe({
      next: (regionsGeo) => {
        const regions = this.parseRegions(regionsGeo);
        this._regions.set(regions);

        this.geoDataService.getColombiaDepartments().subscribe({
          next: (deptsGeo) => {
            const depts = this.parseDepartments(deptsGeo, regions);
            this._departments.set(depts);
            this._status.set('loaded');
          },
          error: (err) => this.handleError(err),
        });
      },
      error: (err) => this.handleError(err),
    });
  }

  selectRegion(regionName: string | null): void {
    this.selectedRegion.set(regionName);
    this.selectedDepartmentCode.set(null); // reset del nivel inferior
  }

  selectDepartment(code: string | null): void {
    this.selectedDepartmentCode.set(code);
  }

  private parseRegions(geo: FeatureCollection): GeoRegion[] {
    return geo.features.map((f) => ({
      name: (f.properties as any)?.['region'] ?? 'Sin nombre',
      feature: f,
    }));
  }

  private parseDepartments(geo: FeatureCollection, regions: GeoRegion[]): GeoDepartment[] {
    return geo.features.map((f) => {
      const centroid = turf.centroid(f as any);
      const regionMatch = regions.find((r) =>
        turf.booleanPointInPolygon(centroid, r.feature as any)
      );
      return {
        code: (f.properties as any)?.[dptCode] ?? '',
        name: (f.properties as any)?.[dptName] ?? 'Sin nombre',
        feature: f,
        regionName: regionMatch?.name ?? null,
      };
    });
  }

  private handleError(err: unknown): void {
    console.error('Error cargando datos geográficos', err);
    this._status.set('error');
    this._error.set('No se pudieron cargar los datos geográficos.');
  }
}