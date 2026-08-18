import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-email',
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
  templateUrl: './edit-email.html',
  styleUrl: './edit-email.css',
})
export class EditEmail {
  readonly emailControl = new FormControl('daryldixon343@gmail.com', [Validators.required, Validators.email]);

}
