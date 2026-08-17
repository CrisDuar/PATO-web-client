import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-prediction-viewer',
  imports: [Navbar],
  templateUrl: './prediction-viewer.html',
  styleUrl: './prediction-viewer.css',
})
export class PredictionViewer {}
