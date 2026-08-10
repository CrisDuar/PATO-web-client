import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-find-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-recovery.html'
})
export class FindAccount {
  email = signal("");

  onSubmit() {
    console.log('Buscando cuenta con email:', this.email);
  }
}
