import { Component, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type LegalDocument = 'terms' | 'privacy' | 'security';

@Component({
  selector: 'app-model-tyc',
  imports: [],
  templateUrl: './modal-tyc.component.html',
  styleUrl: './modal-tyc.css',
})
export class ModalTyc {
  readonly activeDocument = signal<LegalDocument>('terms');
  readonly documentKeys: LegalDocument[] = ['terms', 'privacy', 'security'];

  readonly documents: Record<LegalDocument, { label: string; source: SafeResourceUrl }>;

  constructor(
    public dialog: MatDialogRef<ModalTyc>,
    sanitizer: DomSanitizer,
  ) {
    this.documents = {
      terms: {
        label: 'Términos y condiciones',
        source: sanitizer.bypassSecurityTrustResourceUrl('/assets/legal/terms-%26-conditions.html'),
      },
      privacy: {
        label: 'Tratamiento de datos',
        source: sanitizer.bypassSecurityTrustResourceUrl('/assets/legal/data-treatment-policy.html'),
      },
      security: {
        label: 'Seguridad de datos',
        source: sanitizer.bypassSecurityTrustResourceUrl('/assets/legal/data-security.html'),
      },
    };
  }
}
