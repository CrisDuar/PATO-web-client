// Nombre de la propiedad que identifica al departamento dentro del GeoJSON.
// AJUSTA ESTA CONSTANTE cuando confirmes el nombre real del campo en tu archivo.
export const dptName = 'NOMBRE_DPT';

export interface DepartmentFeatureProperties {
  [dptName]: string;
  // Aquí se agregarán después: ipm, color, indicador, etc.
}