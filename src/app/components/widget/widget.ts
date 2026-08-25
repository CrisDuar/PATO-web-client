import { Component, input } from '@angular/core';
import { WidgetItem } from '../../models/dashboard/dashboard';

@Component({
  selector: 'app-widget',
  imports: [],
  templateUrl: './widget.html',
  styleUrl: './widget.css',
})
export class Widget {
  data = input.required<WidgetItem>();
}
