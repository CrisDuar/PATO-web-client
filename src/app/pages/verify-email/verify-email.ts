import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OtpInput } from '../../components/otp-input/otp-input';
import { MatCardModule } from '@angular/material/card';
import { RegistryService } from '../../core/services/registry.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule, FormsModule, OtpInput, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail {
  private registryService = inject(RegistryService);
  private router = inject(Router);

  email = this.registryService.registeredEmail;
  otpCode = signal('');
  errorMessage = signal('');

  onVerifyToken() {
    const token = this.otpCode();
    const currentEmail = this.email();

    // Limpia cualquier error previo antes de consultar
    this.errorMessage.set('');

    if (token.length < 6) {
      this.errorMessage.set('El código debe tener 6 dígitos');
      return;
    }

    this.registryService.verifyEmail(currentEmail, token).subscribe({
      next: (res) => {
        // Redirigir al inicio de sesión al verificar con éxito
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Muestra el mensaje de error en rojo
        const msg = err.error?.message || 'El token ingresado es incorrecto o ha expirado';
        this.errorMessage.set(msg);
      }
    });
  }
}
