import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../interfaces/LoginRequest';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarPrelogin } from '../../components/navbar-prelogin/navbar-prelogin';
import { Route, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NavbarPrelogin,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);
  private auth = inject(Auth);

  public formBuild = inject(FormBuilder);

  readonly emailControl = new FormControl('', [
    Validators.required, Validators.email
  ]);

  readonly passwordControl = new FormControl('', [Validators.required]);

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    if (this.emailControl.invalid || this.passwordControl.invalid) {
      this.emailControl.markAsTouched();
      this.passwordControl.markAsTouched();
      return;
    }

    const email = this.emailControl.value!;
    const password = this.passwordControl.value!;

    this.auth.login(email, password).subscribe({
      next: () => this.router.navigate(['/map-viewer']),
      error: (err) => console.error('Login failed', err)
    })

  }


}
