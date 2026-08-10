import { Component, signal, computed } from '@angular/core';
import { NavbarPrelogin } from '../../../components/navbar-prelogin/navbar-prelogin';
import { routes } from '../../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registry',
  imports: [NavbarPrelogin],
  templateUrl: './registry.html',
  styleUrl: './registry.css',
})
export class Registry {
  constructor(private router: Router) {}
  PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  emailCampo = signal('');
  passwordCampo = signal('');
  passwordConfirmacionCampo = signal('');

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
    this.router.navigate(['/']);
  }
}
