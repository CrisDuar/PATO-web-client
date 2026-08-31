import { Component, input } from '@angular/core';
import { WidgetItem } from '../../interfaces/ipm.interface';


@Component({
  selector: 'app-widget',
  imports: [],
  templateUrl: './widget.html',
  styleUrl: './widget.css',
})
export class Widget {
  data = input.required<WidgetItem>();
}
