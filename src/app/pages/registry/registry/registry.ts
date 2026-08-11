import {Component, signal, computed, inject} from '@angular/core';
import { NavbarPrelogin } from '../../../components/navbar-prelogin/navbar-prelogin';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-registry',
  imports: [NavbarPrelogin, MatLabel, MatFormField, MatIcon],
  templateUrl: './registry.html',
  styleUrl: './registry.css',
})
export class Registry {
  constructor(private router: Router) {}
  PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  emailCampo = signal('');
  passwordCampo = signal('');
  passwordConfirmacionCampo = signal('');
  private _snackBar = inject(MatSnackBar)
  abrirMensaje(Mensaje: string) {
    this._snackBar.open(Mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  passwordsNoCoinciden = computed(() => {
    const pass = this.passwordCampo();
    const confirm = this.passwordConfirmacionCampo();

    return confirm !== '' && pass !== confirm;
  });
  passwordsNoRequisitos = computed(() => {
    const pass = this.passwordCampo();

    return pass !== '' && !this.PASSWORD_REGEX.test(pass);
  });
  registrarCuenta() {
    const email = this.emailCampo();
    const pass = this.passwordCampo();
    const confirm = this.passwordConfirmacionCampo();
    if(this.passwordsNoCoinciden()){
      this.abrirMensaje("Contraseñas no coinciden")
      return;
    }
    if(this.passwordsNoRequisitos()){
      this.abrirMensaje("Contraseña no cumple con los requisitos minimos")
      return;
    }
    /*
    Se hace una verificacion con los metodos ya existentes para verificación de campos si coincides y si cumplen los requisitos:
    - Al menos una minuscula
    - Al menos una mayuscula
    - Al menos un numero
    - Al menos un caracter especial
    - Al menos la contraseña deberia contar con 8 caracteres

    Se hace verificación en DB con un if preguntando si existe usuarios con el mismo correo
    Si no existe: envia datos a interfaz para registrarlos en la base de datos
    Si si existe: mostrar mensaje de error explicitamente diciendo que ya hay una cuenta vinculada a ese correo
     */
    console.log('Registrando...');
  }
}
