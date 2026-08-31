import { Component, signal, computed, inject } from '@angular/core';
import { NavbarPrelogin } from '../../components/navbar-prelogin/navbar-prelogin';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ModalTyc } from '../../components/modal-tyc/modal-tyc.component'
import { RegistryService } from '../../core/services/registry.service';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';

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
    MatInputModule
  ],
  templateUrl: './registry.html',
  styleUrl: './registry.css',
})
export class Registry {
  private registryService = inject(RegistryService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  errorMessage = signal('');

  readonly emailControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email]
  });

  readonly newPassword = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(8),
      (control) => {
        const val = control.value || '';
        if (!/[A-Z]/.test(val)) return { hasUppercase: true };
        if (!/[0-9]/.test(val)) return { hasNumber: true };
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) return { hasSpecial: true };
        return null;
      }
    ]
  });

  readonly confirmPassword = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  //constructor(private router: Router) {}
  constructor(private __matDialog: MatDialog) {
    merge(this.newPassword.statusChanges, this.newPassword.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  abrirModal(): void {
    this.__matDialog.open(ModalTyc, {
      width: 'min(920px, 96vw)',
      maxWidth: '96vw',
      height: 'min(780px, 92vh)',
      maxHeight: '92vh',
    });
  }

  private _snackBar = inject(MatSnackBar);

  usernameCampo = signal('');
  emailCampo = signal('');
  checkBox = signal(false);

  // Campos vacíos
  camposVacios = computed(() => {
    return (
      this.emailCampo() === ''
    );
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
    // Si ninguno es válido
    if (this.newPassword.invalid || this.confirmPassword.invalid || this.emailControl.invalid || !this.usernameCampo()) {
      this.updateErrorMessage();
      return;
    }

    if (this.newPassword.value !== this.confirmPassword.value) {
      this.abrirMensaje('Las contraseñas no coinciden');
      return;
    }

    if (this.noCheckbox()) {
      this.abrirMensaje('Acepte términos y condiciones');
      return;
    }

    // Extraer valores

    const username = this.usernameCampo();
    const email = this.emailControl.value;
    const pass = this.newPassword.value;
    const confirmPass = this.confirmPassword.value;


    this.registryService.registry(username, email, pass, confirmPass).subscribe({
      next: () => {
        // Bocadillo de usuario actualizada con éxito
        this.snackBar.open('¡Usurio registrado con éxito!', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
        this.router.navigate([''])
      },
      error: (err) => {
          console.error('Error al cambiar la cotraseña', err);
          this.snackBar.open('Error al registrar usuario', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
          });

      }
    })

    if (this.noCheckbox()) {
      this.abrirMensaje('Acepte terminos y condiciones');
      return;
    }

  }

  // Mensajes de error
  updateErrorMessage(): void {
    if (this.newPassword.hasError('required')) {
      this.errorMessage.set('Es obligatorio llenar el campo');
    } else if (this.newPassword.hasError('minlength')) {
      this.errorMessage.set('Mínimo 8 caracteres');
    } else if (this.newPassword.hasError('hasUppercase')) {
      this.errorMessage.set('Debe incluir al menos una letra mayúscula');
    } else if (this.newPassword.hasError('hasNumber')) {
      this.errorMessage.set('Debe incluir al menos un número');
    } else if (this.newPassword.hasError('hasSpecial')) {
      this.errorMessage.set('Debe incluir al menos un carácter especial');
    } else {
      this.errorMessage.set('');
    }
  }

  // Icono de ojo
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hide2 = signal(true);
  clickEvent2(event: MouseEvent) {
    this.hide2.set(!this.hide2());
    event.stopPropagation();
  }

}




