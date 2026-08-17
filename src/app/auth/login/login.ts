import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../interfaces/LoginRequest';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarPrelogin } from '../../components/navbar-prelogin/navbar-prelogin';
import { Router } from '@angular/router';

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
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private router: Router) { }

  login() {
    this.router.navigate(['/map-viewer']).then((success) => {
      console.log('Navegación:', success);
    });
    //if (this.formLogin.invalid) return;

    const object: LoginRequest = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };

  }
}
