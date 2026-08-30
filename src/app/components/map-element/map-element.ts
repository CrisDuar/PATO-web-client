import {
  Component, ElementRef, Injector, OnDestroy, ViewChild,
  afterNextRender, effect, input,
} from '@angular/core';
import type * as L from 'leaflet';
import type { Feature } from 'geojson';
import type { LocationSelection } from '../sidebar-map/sidebar-map';
import { GeoDataService } from '../../core/services/geo-data-service';
import { dptName } from '../../core/models/department-model';

const COUNTRY_COORDS: Record<string, { center: L.LatLngExpression; zoom: number }> = {
  Colombia: { center: [4.5709, -74.2973], zoom: 6 },
};

const DEPARTMENT_COORDS: Record<string, { center: L.LatLngExpression; zoom: number }> = {
  Santander: { center: [7.1193, -73.1227], zoom: 9 },
  Antioquia: { center: [6.5735, -75.6446], zoom: 9 },
  Cundinamarca: { center: [4.9435, -74.1274], zoom: 9 },
};

const MUNICIPALITY_COORDS: Record<string, { center: L.LatLngExpression; zoom: number }> = {
  Bucaramanga: { center: [7.1193, -73.1227], zoom: 13 },
  Floridablanca: { center: [7.0653, -73.0868], zoom: 13 },
  Girón: { center: [7.0687, -73.1717], zoom: 13 },
};

const DEFAULT_VIEW = { center: [4.5709, -74.2973] as L.LatLngExpression, zoom: 6 };

const REGION_BASE_STYLE = { color: '#4b5563', weight: 2, fillColor: '#e5e7eb', fillOpacity: 0.6 };
const REGION_HOVER_STYLE = { weight: 3, color: '#111827', fillOpacity: 0.8 };
const DEPARTMENT_BASE_STYLE = { color: '#6b7280', weight: 1.2, fillColor: '#f3f4f6', fillOpacity: 0.6 };
const DEPARTMENT_HOVER_STYLE = { weight: 2.5, color: '#111827', fillOpacity: 0.8 };

type ColombiaViewLevel = 'regions' | 'departments';

@Component({
  selector: 'app-map-element',
  imports: [],
  templateUrl: './map-element.html',
  styleUrl: './map-element.css',
})
export class MapElementComponent implements OnDestroy {
  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLDivElement>;

  location = input<LocationSelection | null>(null);

  private map: L.Map | undefined;
  private leaflet: typeof import('leaflet') | undefined;
  private regionsLayer: L.GeoJSON | undefined;
  private departmentsLayer: L.GeoJSON | undefined;
  private colombiaLevel: ColombiaViewLevel = 'regions';

  constructor(
    private injector: Injector,
    private geoDataService: GeoDataService
  ) {
    afterNextRender(async () => {
      const leafletModule: any = await import('leaflet');
      this.leaflet = leafletModule.default ?? leafletModule;

      this.initMap();

      effect(
        () => {
          const loc = this.location();
          this.updateView(loc);
          this.syncColombiaLayers(loc);
        },
        { injector: this.injector }
      );
    }, { injector: this.injector });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    const L = this.leaflet!;

    this.map = L.map(this.mapContainer.nativeElement, {
      center: DEFAULT_VIEW.center,
      zoom: DEFAULT_VIEW.zoom,
    });

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
      }
    ).addTo(this.map);
  }

  private updateView(loc: LocationSelection | null): void {
    if (!this.map) return;

    let target = DEFAULT_VIEW;

    if (loc?.municipio && MUNICIPALITY_COORDS[loc.municipio]) {
      target = MUNICIPALITY_COORDS[loc.municipio];
    } else if (loc?.departamento && DEPARTMENT_COORDS[loc.departamento]) {
      target = DEPARTMENT_COORDS[loc.departamento];
    } else if (loc?.pais && COUNTRY_COORDS[loc.pais]) {
      target = COUNTRY_COORDS[loc.pais];
    }

    this.map.flyTo(target.center, target.zoom, { duration: 1.2 });
  }

  private syncColombiaLayers(loc: LocationSelection | null): void {
    const isColombia = loc?.pais === 'Colombia';

    if (!isColombia) {
      this.removeRegionsLayer();
      this.removeDepartmentsLayer();
      this.colombiaLevel = 'regions';
      return;
    }

    const wantsDepartmentLevel = !!loc?.departamento || this.colombiaLevel === 'departments';

    if (wantsDepartmentLevel) {
      this.removeRegionsLayer();
      this.showDepartmentsLayer();
    } else {
      this.removeDepartmentsLayer();
      this.showRegionsLayer();
    }
  }

  private showRegionsLayer(): void {
    if (this.regionsLayer || !this.map) return;
    const L = this.leaflet!;

    this.geoDataService.getColombiaRegions().subscribe((geojson) => {
      if (!this.map) return;
      this.regionsLayer = L.geoJSON(geojson as any, {
        style: () => REGION_BASE_STYLE,
        onEachFeature: (feature: Feature, layer: L.Layer) => {
          const name = feature.properties?.['region'] ?? 'Región';
          layer.bindTooltip(name, { permanent: true, direction: 'center', className: 'department-label' });

          layer.on('mouseover', () => (layer as L.Path).setStyle(REGION_HOVER_STYLE));
          layer.on('mouseout', () => (layer as L.Path).setStyle(REGION_BASE_STYLE));

          layer.on('click', () => {
            this.colombiaLevel = 'departments';
            this.removeRegionsLayer();
            this.showDepartmentsLayer();

            const bounds = (layer as L.Polygon).getBounds();
            this.map?.flyToBounds(bounds, { duration: 1 });
          });
        },
      }).addTo(this.map);
    });
  }

  private showDepartmentsLayer(): void {
    if (this.departmentsLayer || !this.map) return;
    const L = this.leaflet!;

    this.geoDataService.getColombiaDepartments().subscribe((geojson) => {
      if (!this.map) return;
      this.departmentsLayer = L.geoJSON(geojson as any, {
        style: () => DEPARTMENT_BASE_STYLE,
        onEachFeature: (feature: Feature, layer: L.Layer) => {
          const name = feature.properties?.[dptName] ?? 'Departamento';
          layer.bindTooltip(name, { permanent: true, direction: 'center', className: 'department-label' });

          layer.on('mouseover', () => (layer as L.Path).setStyle(DEPARTMENT_HOVER_STYLE));
          layer.on('mouseout', () => (layer as L.Path).setStyle(DEPARTMENT_BASE_STYLE));
          layer.on('click', () => {
            // TODO: semaforización / detalle del departamento
            console.log('Departamento:', name);
          });
        },
      }).addTo(this.map);
    });
  }

  private removeRegionsLayer(): void {
    this.regionsLayer?.remove();
    this.regionsLayer = undefined;
  }

  private removeDepartmentsLayer(): void {
    this.departmentsLayer?.remove();
    this.departmentsLayer = undefined;
  }
}