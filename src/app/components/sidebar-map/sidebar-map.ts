import { Component, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Indicator {
  key: string;
  label: string;
}

interface IndicatorGroup {
  title: string;
  items: Indicator[];
}

export interface LocationSelection {
  pais: string | null;
  departamento: string | null;
  municipio: string | null;
}

@Component({
  selector: 'app-sidebar-map',
  imports: [FormsModule],
  templateUrl: './sidebar-map.html',
  styleUrl: './sidebar-map.css',
})

export class Sidebar {
  // --- Indicadores agrupados ---
  indicatorGroups: IndicatorGroup[] = [
    {
      title: 'Salud',
      items: [
        { key: 'nutricion', label: 'Nutrición' },
        { key: 'mortalidad_infantil', label: 'Mortalidad infantil' },
      ],
    },
    {
      title: 'Educación',
      items: [
        { key: 'anios_escolaridad', label: 'Años de escolaridad' },
        { key: 'asistencia_escolar', label: 'Asistencia escolar' },
      ],
    },
    {
      title: 'Nivel de vida',
      items: [
        { key: 'combustible_cocinar', label: 'Combustible para cocinar' },
        { key: 'saneamiento', label: 'Saneamiento' },
        { key: 'agua_potable', label: 'Agua potable' },
        { key: 'electricidad', label: 'Electricidad' },
        { key: 'vivienda', label: 'Vivienda' },
        { key: 'activos', label: 'Activos' },
      ],
    },
  ];

  // Solo un indicador activo a la vez
  activeIndicator = signal<string | null>(null);

  toggleIndicator(key: string) {
    this.activeIndicator.set(this.activeIndicator() === key ? null : key);
  }

  isActive(key: string): boolean {
    return this.activeIndicator() === key;
  }

  // --- Ubicación (data de prueba) ---
  paises = ['Colombia'];
  departamentos = ['Santander', 'Antioquia', 'Cundinamarca'];
  municipios = ['Bucaramanga', 'Floridablanca', 'Girón'];

  selectedPais = model<string | null>(null);
  selectedDepartamento = model<string | null>(null);
  selectedMunicipio = model<string | null>(null);
    // Evento que el padre (MapViewer) va a escuchar
  locationChange = output<LocationSelection>();

  onPaisChange(value: string | null) {
    this.selectedPais.set(value);
    // Al cambiar país, se resetean los niveles inferiores (flujo jerárquico)
    this.selectedDepartamento.set(null);
    this.selectedMunicipio.set(null);
    this.emitLocation();
  }

  onDepartamentoChange(value: string | null) {
    this.selectedDepartamento.set(value);
    this.selectedMunicipio.set(null);
    this.emitLocation();
  }

  onMunicipioChange(value: string | null) {
    this.selectedMunicipio.set(value);
    this.emitLocation();
  }

  private emitLocation() {
    this.locationChange.emit({
      pais: this.selectedPais(),
      departamento: this.selectedDepartamento(),
      municipio: this.selectedMunicipio(),
    });
  }
}
