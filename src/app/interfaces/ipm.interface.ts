export interface IpmApiResponse {
  anio: number;
  dominio: string;
  ipm: string; // Llega como string ej: "29.700000"
}

export interface WidgetItem {
  id: number;
  label: string; // Siempre estático: "Incidencia IPM"
  ipmValue: number;
  year: number;
  domain: string;
  rows?: number;
  columns?: number;
  content: Type<unknown>;
}