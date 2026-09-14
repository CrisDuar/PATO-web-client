import { Type } from '@angular/core';

export interface WidgetItem {
    id: number;
    label: string;
    content: Type<unknown>;
}

// Dashboard 1

export interface PmiApiResponse {
    anio: number;
    dominio: string;
    ipm: string;
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

// Dashboard 2

export interface IncidencePersonItem {
    anio: number;
    region: string;
    departamento: string;
}

// Dashboard 3

export interface ContributionPovertyItem {
    anio: number;
    privacion: string;
    pais: string;
    valor_porcentaje: number;
}

export interface NationalPovertyItem {
    anio: number;
    area_geografica: string;
    pais: string;
    tipo_medida_pm: string;
    valor_porcentaje: number;
}

export interface PovertyByAgeItem {
    anio: number;
    area_geografica: string;
    pais: string;
    grupo_erario: string;
    valor_porcentaje: number;
}
