import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './otp-input.html',
  styleUrl: './otp-input.css',
})
export class OtpInput {
  otpCode: string = '';

  // Declara el evento de salida usando la API de Signal Outputs de Angular 20
  codeChange = output<string>();

  get digits(): string[] {
    return Array(6).fill('').map((_, i) => this.otpCode[i] || '');
  }

  // Método que debes llamar cada vez que el usuario escriba en las casillas
  onInputChange(value: string) {
    this.otpCode = value;
    this.codeChange.emit(this.otpCode);
  }
}
