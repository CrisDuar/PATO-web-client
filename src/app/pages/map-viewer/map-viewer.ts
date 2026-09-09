import { Component, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { LocationSelection, MapSelection, Sidebar } from '../../components/sidebar-map/sidebar-map';
import { MapElementComponent } from '../../components/map-element/map-element';

@Component({
  selector: 'app-map-viewer',
  imports: [Navbar, Sidebar, MapElementComponent],
  templateUrl: './map-viewer.html',
  styleUrl: './map-viewer.css',
})
export class MapViewer {
  
  currentSelection = signal<MapSelection>({
    locations: [this.emptyLocation()],
    ipm: {
      year: 2020,
      deprivation: [],
      source: 'dane',
    },
    domain: 'national',
    granularity: 'region',
  });

  onSelectionChange(selection: MapSelection): void {
    this.currentSelection.set(selection);
  }

  onMapLocationChange(location: LocationSelection): void {
    this.currentSelection.update(current => ({
      ...current,
      locations: [location, current.locations[1]],
    }));
  }

  private emptyLocation(): LocationSelection {
    return { pais: null, region: null, departamento: null };
  }
}
