import { Component, inject, signal, effect } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Widget } from '../../components/widget/widget';
import { Navbar } from '../../components/navbar/navbar';
import { isPlatformBrowser } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-prediction-viewer',
  imports: [Navbar, NgComponentOutlet, MatSelectModule, MatFormFieldModule],
  templateUrl: './prediction-viewer.html',
  styleUrl: './prediction-viewer.css',
})
export class PredictionViewer {

  availableYears = signal<number[]>([2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
    2019, 2020, 2021, 2022, 2023, 2024, 2025]);

  availableMpi = signal<string[]>(
    ['Educación',
      'Niñez y juventud',
      'Trabajo',
      'Salud',
      'Condiciones de vivienda',
      'Servicios públicos',
    ]
  );

  year = signal<number>(2010);
  year2 = signal<number>(2010);
  mpi = signal<string>('Educación');

  constructor() {
    effect(() => {
      const year = this.year();
      const year2 = this.year2();
      const mpi = this.mpi();
    });
  }
}


