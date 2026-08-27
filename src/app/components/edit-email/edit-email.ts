import { Component, signal, inject, OnInit } from '@angular/core';
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
export class EditEmail implements OnInit {
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<EditProfile>);
  private userService = inject(UserService);

  readonly emailControl = new FormControl('', [
    Validators.required, Validators.email
  ]);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.emailControl.setValue(user.email);
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
    if (this.emailControl.invalid || !this.emailControl.value) {
      return;
    }

    const payload = {
      new_email: this.emailControl.value,
      password: ''
    };

    this.userService.updateEmail(payload).subscribe({
      next: () => {
        this.snackBar.open('¡Correo actualizado correctamente!', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al actualizar el correo:', err);
        this.snackBar.open('Error al actualizar el correo', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      }
    });
  }

}
