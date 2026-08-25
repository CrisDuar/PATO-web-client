import {
  Component,
  ElementRef,
  input,
  OnDestroy,
  ViewChild,
  afterNextRender,
  Injector,
  effect,
  Input,
} from '@angular/core';
import type * as L from 'leaflet';
import type { LocationSelection } from '../sidebar-map/sidebar-map';

// --- Coordenadas de prueba: reemplazar cuando exista el servicio real ---
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

@Component({
  selector: 'app-map-element',
  imports: [],
  templateUrl: './map-element.html',
  styleUrl: './map-element.css',
})

export class MapElementComponent implements OnDestroy {
  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLDivElement>;

  // Input reactivo: cada vez que cambia, el effect() de abajo reacciona
  location = input<LocationSelection | null>(null);

  private map: L.Map | undefined;
  private leaflet: typeof import('leaflet') | undefined;

  constructor(private injector: Injector) {
    afterNextRender(async () => {
      const leafletModule: any = await import('leaflet');
      // En prod, a veces viene como { default: L }, en dev viene como L directo.
      this.leaflet = leafletModule.default ?? leafletModule;

      this.initMap();

      effect(
        () => {
          const loc = this.location();
          this.updateView(loc);
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

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);
  }

  // Aquí está la lógica del flujo jerárquico: municipio > departamento > país
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
}