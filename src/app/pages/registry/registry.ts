import { Component, signal, computed, inject } from '@angular/core';
import { NavbarPrelogin } from '../../components/navbar-prelogin/navbar-prelogin';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { ModalTyc } from '../../components/modal-tyc/modal-tyc.component'
import { RegistryService } from '../../core/services/registry.service';

@Component({
  selector: 'app-registry',
  imports: [
    NavbarPrelogin,
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    MatIconButton,
    MatIcon,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './registry.html',
  styleUrl: './registry.css',
})
export class Registry {
  private registryService = inject(RegistryService);
  private router = inject(Router);

  //constructor(private router: Router) {}
  constructor(private __matDialog: MatDialog) {}
  abrirModal(): void {
    this.__matDialog.open(ModalTyc, {
      width: 'min(920px, 96vw)',
      maxWidth: '96vw',
      height: 'min(780px, 92vh)',
      maxHeight: '92vh',
    });
  }
  private _snackBar = inject(MatSnackBar);

  PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  usernameCampo = signal('');
  emailCampo = signal('');
  passwordCampo = signal('');
  passwordConfirmacionCampo = signal('');
  checkBox = signal(false);

  hide = signal(true);
  hide2 = signal(false);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
  }
  clickEvent2(event: MouseEvent) {
    this.hide2.set(!this.hide2());
  }
  camposVacios = computed(() => {
    return (
      this.emailCampo() === '' ||
      this.passwordCampo() === '' ||
      this.passwordConfirmacionCampo() === ''
    );
  });
  passwordsNoCoinciden = computed(() => {
    const pass = this.passwordCampo();
    const confirm = this.passwordConfirmacionCampo();
    return confirm !== '' && pass !== confirm;
  });
  passwordsNoRequisitos = computed(() => {
    const pass = this.passwordCampo();
    return pass !== '' && !this.PASSWORD_REGEX.test(pass);
  });
  noCheckbox = computed(() => !this.checkBox());
  abrirMensaje(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
  
  registrarCuenta() {
    if (this.camposVacios()) {
      this.abrirMensaje('Rellene los campos vacios');
      return;
    }
    if (this.passwordsNoCoinciden()) {
      this.abrirMensaje('Contraseñas no coinciden');
      return;
    }
    if (this.passwordsNoRequisitos()) {
      this.abrirMensaje('Contraseña no cumple con los requisitos minimos');
      return;
    }
    if (this.noCheckbox()) {
      this.abrirMensaje('Acepte terminos y condiciones');
      return;
    }

    // Extraer valores
    const email = this.emailCampo();
    const pass = this.passwordCampo();
    const confirmPass = this.passwordConfirmacionCampo();
    const username = this.usernameCampo();

    // Consumir servicio
    this.registryService.registry(username, email, pass, confirmPass).subscribe({
      next: (res) => {
        this.registryService.setEmail(email);
        this.abrirMensaje('Cuenta creada exitosamente');
        this.router.navigate(['/verify-email']);
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Error al registrar la cuenta';
        this.abrirMensaje(errorMsg);
      }
    });

    /*
    Se hace una verificacion con los metodos ya existentes para verificación de campos si coinciden y si cumplen los requisitos:
    - Al menos una minuscula
    - Al menos una mayuscula
    - Al menos un numero
    - Al menos un caracter especial
    - Al menos la contraseña deberia contar con 8 caracteres
    Se hace verificación en DB con un if preguntando si existe usuarios con el mismo correo
    Si no existe: envia datos a interfaz para registrarlos en la base de datos
    Si si existe: mostrar mensaje de error explicitamente diciendo que ya hay una cuenta vinculada a ese correo
    */
    console.log('Registrando...', email, pass);
  }
  
}
