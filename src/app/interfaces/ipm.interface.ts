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

export interface ContributionImpactItem {
    anio: number;
    dominio: string;
    dimension: string;
    porcentaje: string;
}

export interface MpiSexItem {
    anio: number;
    dominio: string;
    sexo: string;
    porcentaje: string;
}

export interface MpiBossSexItem {
    anio: number;
    dominio: string;
    sexo: string;
    porcentaje: string;
}

export interface ContributionPovertyItem {
    anio: number;
    privacion: string;
    pais: string;
    porcentaje: number;
}

export interface PopulationPovertyItem {
    anio: number;
    area_geografica: string;
    pais: string;
    grupo_erario: string;
    valor_porcentaje: number;
}

export interface IncidencePersonItem {
    anio: number;
    region: string;
    departamento: string;
}