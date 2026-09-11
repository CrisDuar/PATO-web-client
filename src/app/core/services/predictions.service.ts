import { HttpClient } from '@angular/common/http';
import { Service, signal, inject, PLATFORM_ID } from '@angular/core';
import { WidgetItem } from '../../interfaces/ipm.interface';

@Service()
export class PredictionsService {
    private httpClient = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);

    widgets = signal<WidgetItem[]>([

    ]);
}
