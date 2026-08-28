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
import { AccountRecoveryService } from '../../core/services/account-recovery.service';


@Component({
  selector: 'app-find-account',
  standalone: true,
  imports: [CommonModule, FormsModule, OtpInput, MatCardModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './account-recovery.html'
})
export class FindAccount {
  private recoveryService = inject(AccountRecoveryService);
  private router = inject(Router);

  email: string = '';
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  onSubmit(): void {
    if (!this.email) return;

    this.errorMessage.set('');
    this.isLoading.set(true);

    this.recoveryService.requestPasswordReset(this.email).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.router.navigate(['/reset-password']);
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg = err.error?.message || 'No se pudo encontrar una cuenta asociada a este correo';
        this.errorMessage.set(msg);
      }
    });
  }
}
