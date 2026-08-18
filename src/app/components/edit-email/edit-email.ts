import { Component, signal, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfile } from '../edit-profile/edit-profile';


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
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<EditProfile>);
  
  readonly emailControl = new FormControl('daryldixon343@gmail.com', [
    Validators.required, Validators.email
  ]);

  onSave(): void {
    // Si ninguno es válido
    if (this.emailControl.invalid) {
      return;
    }

    // Bocadillo de contraseña actualizada con éxito
    this.snackBar.open('¡Correo actualizado correctamente!', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    this.dialogRef.close(true);
  }

}
