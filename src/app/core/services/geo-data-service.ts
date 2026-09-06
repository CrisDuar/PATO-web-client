import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import type { FeatureCollection } from 'geojson';

@Injectable({ providedIn: 'root' })
export class GeoDataService {
  private colombiaDepartments$?: Observable<FeatureCollection>;
  private colombiaRegions$?: Observable<FeatureCollection>;
  private countries$?: Observable<FeatureCollection>;

  constructor(private http: HttpClient) {}

  getColombiaDepartments(): Observable<FeatureCollection> {
    if (!this.colombiaDepartments$) {
      this.colombiaDepartments$ = this.http
        .get<FeatureCollection>('/assets/geo/colombia-departments.geojson')
        .pipe(shareReplay(1));
    }

    return this.colombiaDepartments$;
  }

  getColombiaRegions(): Observable<FeatureCollection> {
    if (!this.colombiaRegions$) {
      this.colombiaRegions$ = this.http
        .get<FeatureCollection>('/assets/geo/colombia-regions.geojson')
        .pipe(shareReplay(1));
    }

    return this.colombiaRegions$;
  }

  getCountries(): Observable<FeatureCollection> {
    if (!this.countries$) {
      this.countries$ = this.http
        .get<FeatureCollection>('/assets/geo/countries.geojson')
        .pipe(shareReplay(1));
    }

    return this.countries$;
  }
}