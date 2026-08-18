import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-name',
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule, 
    ReactiveFormsModule,
  ],
  templateUrl: './edit-name.html',
  styleUrl: './edit-name.css',
})
export class EditName {
  readonly nameControl = new FormControl('Daryl Dixon', [
    Validators.required,
    Validators.minLength(3)
  ]);
}
