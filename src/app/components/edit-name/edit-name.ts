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
import { UserService } from '../../core/services/user.service';


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
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<EditProfile>);
  private userService = inject(UserService);

  readonly nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.nameControl.setValue(user.username);
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        this.snackBar.open('Error al obtener la información del usuario', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  onSave(): void {
    // Si ninguno es válido
    if (this.nameControl.invalid || !this.nameControl.value) {
      return;
    }

    const payload = {
      new_username: this.nameControl.value
    };

    this.userService.updateName(payload).subscribe({
      next: () => {
        // Bocadillo de nombre actualizado con éxito
        this.snackBar.open('¡Nombre actualizado correctamente!', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al actualizar el nombre:', err);
        this.snackBar.open('Error al actualizar el nombre', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      }
    });
  }

}
