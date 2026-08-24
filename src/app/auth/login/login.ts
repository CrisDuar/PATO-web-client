import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../interfaces/LoginRequest';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarPrelogin } from '../../components/navbar-prelogin/navbar-prelogin';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public formBuild = inject(FormBuilder);

  constructor(private router: Router) { }

  readonly emailControl = new FormControl('', [
    Validators.required, Validators.email
  ]);

  readonly passwordControl = new FormControl('', [Validators.required]);

  login() {
    this.router.navigate(['/map-viewer']).then((success) => {
      console.log('Navegación:', success);
    });
  }

  hide = signal(true);
    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }

}
