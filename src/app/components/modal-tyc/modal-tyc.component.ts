import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-model-tyc',
  imports: [],
  templateUrl: './modal-tyc.component.html',
  styleUrl: './modal-tyc.css',
})
export class ModalTyc {
  constructor(public dialog : MatDialogRef<ModalTyc>) {

  }
}
