import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfile } from '../edit-profile/edit-profile';
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { merge } from 'rxjs';
import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'app-edit-password',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,

  ],
  templateUrl: './edit-password.html',
  styleUrl: './edit-password.css',
})
export class EditPassword {
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<EditProfile>);
  errorMessage = signal('');
  private userService = inject(UserService);

  readonly currentPassword = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  readonly newPassword = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/(?=.*[A-Z])(?=.*[0-9])/)
    ]
  });

  readonly confirmPassword = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  constructor() {
    merge(this.newPassword.statusChanges, this.newPassword.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  onSave(): void {
    // Si ninguno es válido
    if (this.currentPassword.invalid || this.newPassword.invalid || this.confirmPassword.invalid) {
      this.updateErrorMessage();
      return;
    }

    const payload = {
      current_password: this.currentPassword.value,
      new_password: this.newPassword.value,
      confirm_new_password: this.confirmPassword.value
    };

    this.userService.updatePassword(payload).subscribe({
      next: () => {
        // Bocadillo de contraseña actualizada con éxito
        this.snackBar.open('¡Contraseña actualizada correctamente!', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al cambiar la cotraseña', err);
        this.snackBar.open('Error al cambiar la contraseña', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }


    })


    if (this.newPassword.value !== this.confirmPassword.value) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }


  }

  // Mensajes de error
  updateErrorMessage(): void {
    if (this.newPassword.hasError('required')) {
      this.errorMessage.set('Es obligatorio llenar el campo');
    } else if (this.newPassword.hasError('minlength')) {
      this.errorMessage.set('Mínimo 8 caracteres');
    } else if (this.newPassword.hasError('pattern')) {
      this.errorMessage.set('Debe incluir al menos una mayúscula y un número');
    } else {
      this.errorMessage.set('');
    }
  }

}
