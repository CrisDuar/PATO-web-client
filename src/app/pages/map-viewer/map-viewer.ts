import { Component, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { LocationSelection, Sidebar } from '../../components/sidebar-map/sidebar-map';
import { MapElementComponent } from '../../components/map-element/map-element';

@Component({
  selector: 'app-map-viewer',
  imports: [Navbar, Sidebar, MapElementComponent],
  templateUrl: './map-viewer.html',
  styleUrl: './map-viewer.css',
})
export class MapViewer {
  currentLocation = signal<LocationSelection>({
    pais: null,
    departamento: null,
    municipio: null,
  });

  onLocationChange(location: LocationSelection) {
    this.currentLocation.set(location);
  }
}
