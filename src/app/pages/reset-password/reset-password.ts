import { Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OtpInput } from '../../components/otp-input/otp-input';
import { MatCardModule } from '@angular/material/card';
import { RegistryService } from '../../core/services/registry.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatActionList } from "@angular/material/list";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../core/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { AccountRecoveryService } from '../../core/services/account-recovery.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule, 
    FormsModule, 
    OtpInput, 
    MatCardModule, 
    MatButtonModule, 
    MatActionList, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  private snackBar = inject(MatSnackBar);
  private recoveryService = inject(AccountRecoveryService); 
  private router = inject(Router);

  otpCode = signal('');
  errorMessage = signal('');

  readonly newPassword = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/(?=.*[A-Z])(?=.*[0-9])/)
    ]
  });

  readonly confirmPassword = new FormControl('', { 
    nonNullable: true, 
    validators: [Validators.required] 
  });

  constructor() {
    merge(this.newPassword.statusChanges, this.newPassword.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  onVerifyToken(): void {
    const token = this.otpCode();
    const pass = this.newPassword.value;
    const confirm = this.confirmPassword.value;

    this.errorMessage.set('');

    if (token.length < 6) {
      this.errorMessage.set('El código debe tener 6 dígitos');
      return;
    }

    if (this.newPassword.invalid || this.confirmPassword.invalid) {
      this.updateErrorMessage();
      return;
    }

    if (pass !== confirm) {
      this.errorMessage.set('Las contraseñas no coinciden');
      return;
    }

    this.recoveryService.verifyToken(token, pass, confirm).subscribe({
      next: () => {
        this.snackBar.open('¡Contraseña restablecida con éxito!', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
        this.router.navigate(['']);
      },
      error: (err) => {
        const msg = err.error?.message || 'El código es incorrecto o las contraseñas no son válidas';
        this.errorMessage.set(msg);
      }
    });
  }

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
