import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-ipm',
  imports: [],
  templateUrl: './ipm.html',
  styleUrl: './ipm.css',
})
export class Ipm {
  label = 'INCIDENCIA IPM'; 

  ipmValue = input<number | string>(0);
  year = input<number | string>('');
  domain = input<string>('');

  formattedValue = computed(() => {
    const val = Number(this.ipmValue());
    return isNaN(val) ? '0' : val.toFixed(1);
  });
}
