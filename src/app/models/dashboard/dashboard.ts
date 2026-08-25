import { Component, Type } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}

export interface WidgetItem {
  id: number;
  label: string;
  content: Type<unknown>;
}