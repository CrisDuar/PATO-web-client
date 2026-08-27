import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassRecoveryService } from '../../core/services/pass-recovery.service';
import { Router } from 'express';
import { AccountRecoveryService } from '../../core/services/account-recovery.service';

@Component({
  selector: 'app-find-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-recovery.html'
})
export class FindAccount {
  email: string = ''; // Debe existir esta variable

  private recoveryService = inject(AccountRecoveryService);

  onSubmit() {
    if (!this.email) return;

    this.recoveryService.registry(this.email).subscribe({
      next: (res) => {
        console.log('Petición exitosa:', res);
      },
      error: (err) => {
        console.error('Error en la petición:', err);
      }
    });
  }
}
