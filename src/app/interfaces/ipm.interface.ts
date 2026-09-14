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

export interface IndicatorDeptItem {
    anio: number;
    region: string;
    departamento: string;
    personas_que_habitan_ese_hogar: number;
    privacion_bajo_logro_educativo: number;
    privacion_analfabetismo: number;
    privacion_inasistencia_escolar: number;
    privacion_rezago_escolar: number;
    privacion_atencion_integral_primera_infancia: number;
    privacion_trabajo_infantil: number;
    pprivacion_no_aseguramiento_salud: number;
    privacion_barreras_acceso_salud: number;
    privacion_desempleo_larga_duracion: number;
    privacion_tasa_empleo_formal: number;
    privacion_no_acceso_agua_mejorada: number;
    privacion_inadecuado_material_piso: number;
    privacion_inadecuado_material_paredes: number;
    privacion_hacinamiento_critico: number;
    ipm: number;
    pobre: number;
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
