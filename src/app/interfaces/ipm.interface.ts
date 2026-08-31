import { Type } from '@angular/core';

export interface PmiApiResponse {
    anio: number;
    dominio: string;
    ipm: string;
}

export interface WidgetItem {
    id: number;
    label: string;
    content: Type<unknown>;
}

export interface DeprivationsItem {
    anio: number;
    dominio: string;
    variable: string;
    ipm: number;
}

export interface IntensityPovertyItem {
    anio: number;
    dominio: string;
    porcentaje: string;
}