import {
  Component, ElementRef, Injector, OnDestroy, ViewChild,
  afterNextRender, effect, input, output,
} from '@angular/core';
import type * as L from 'leaflet';
import type { Feature, FeatureCollection } from 'geojson';
import type { LocationSelection } from '../sidebar-map/sidebar-map';
import { GeoDataService } from '../../core/services/geo-data-service';
import { dptName } from '../../interfaces/department-model';
import { LocationService } from '../../core/services/location.service';


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
  locationChange = output<LocationSelection>();
  location = input<LocationSelection | null>(null);
  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLDivElement>;


  private map: L.Map | undefined;
  private leaflet: typeof import('leaflet') | undefined;
  private countriesLayer: L.GeoJSON | undefined;
  private regionsLayer: L.GeoJSON | undefined;
  private departmentsLayer: L.GeoJSON | undefined;
  private colombiaLevel: ColombiaViewLevel = 'regions';
  private countriesGeojson: FeatureCollection | undefined;

  constructor(
    private injector: Injector,
    private geoDataService: GeoDataService,
    private locationService: LocationService
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
    if (!this.map || !this.leaflet) return;

    const L = this.leaflet;

    if (loc?.departamento) {
      const department = this.locationService
        .departmentFeatures()
        .find(department => department.code === loc.departamento);

      if (department) {
        this.map.flyToBounds(
          L.geoJSON(department.feature as any).getBounds(),
          { duration: 1.2 }
        );
      }

      return;
    }

    if (loc?.region) {
      const region = this.locationService
        .regionFeatures()
        .find(region => region.name === loc.region);

      if (region) {
        this.map.flyToBounds(
          L.geoJSON(region.feature as any).getBounds(),
          { duration: 1.2 }
        );
      }

      return;
    }

    if (loc?.pais && loc.pais !== 'Colombia') {
      const country = this.countriesGeojson?.features.find(
        feature => feature.properties?.['name'] === loc.pais
      );

      if (country) {
        this.map.flyToBounds(
          L.geoJSON(country as any).getBounds(),
          { duration: 1.2 }
        );
      }

      return;
    }

    if (loc?.pais === 'Colombia') {
      this.map.flyTo([4.5709, -74.2973], 6, {
        duration: 1.2,
      });
    }
  }

  private syncColombiaLayers(loc: LocationSelection | null): void {
    const isColombia = loc?.pais === 'Colombia';

    if (!isColombia) {
      this.removeRegionsLayer();
      this.removeDepartmentsLayer();
      this.showCountriesLayer();
      this.colombiaLevel = 'regions';
      return;
    }
    
    this.removeCountriesLayer();
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

            this.locationChange.emit({
              pais: 'Colombia',
              region: name,
              departamento: null,
            });

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
            const code = feature.properties?.['DPTO'] ?? null;

            this.locationChange.emit({
              pais: 'Colombia',
              region: this.locationService.selectedRegion(),
              departamento: code,
            });

            const bounds = (layer as L.Polygon).getBounds();
            this.map?.flyToBounds(bounds, { duration: 1.2 });
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

  private showCountriesLayer(): void {
    if (this.countriesLayer || !this.map || !this.leaflet) return;

    const L = this.leaflet;

    this.geoDataService.getCountries().subscribe({
      next: (geojson) => {
        if (!this.map) return;

        this.countriesGeojson = geojson;

        this.countriesLayer = L.geoJSON(geojson as any, {
          style: {
            color: '#64748b',
            weight: 1,
            fillColor: '#cbd5e1',
            fillOpacity: 0.45,
          },

          onEachFeature: (feature: Feature, layer: L.Layer) => {
            const name = feature.properties?.['name'] ?? 'País';

            layer.bindTooltip(name, {
              direction: 'center',
              className: 'country-label',
            });

            layer.on('mouseover', () => {
              (layer as L.Path).setStyle({
                weight: 2,
                color: '#0f172a',
                fillOpacity: 0.7,
              });
            });

            layer.on('mouseout', () => {
              (layer as L.Path).setStyle({
                color: '#64748b',
                weight: 1,
                fillColor: '#cbd5e1',
                fillOpacity: 0.45,
              });
            });

            layer.on('click', (event) => {
              const path = layer as L.Path;

              // Quita el foco que genera el cuadro naranja
              (event.originalEvent.target as HTMLElement).blur();

              // Centra el mapa en el país seleccionado
              const bounds = (layer as L.Polygon).getBounds();
              this.map?.flyToBounds(bounds, { duration: 1 });

              // Mantiene el estilo normal, sin selección naranja
              path.setStyle({
                color: '#64748b',
                weight: 1,
                fillColor: '#cbd5e1',
                fillOpacity: 0.45,
              });

              this.locationChange.emit({
                pais: name,
                region: null,
                departamento: null,
              });

              console.log('País seleccionado:', name);
            });
          },
        }).addTo(this.map);
      },

      error: (error) => {
        console.error('Error cargando países', error);
      },
    });
  }

  private removeCountriesLayer(): void {
    this.countriesLayer?.remove();
    this.countriesLayer = undefined;
  }
}