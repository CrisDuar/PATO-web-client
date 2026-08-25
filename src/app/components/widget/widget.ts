import { Component, input } from '@angular/core';

@Component({
  selector: 'app-widget',
  imports: [],
  templateUrl: './widget.html',
  styleUrl: './widget.css',
})
export class Widget {
  data = input.required<>
}
