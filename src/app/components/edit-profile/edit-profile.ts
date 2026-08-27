import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { merge } from 'rxjs';
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { EditPassword } from '../edit-password/edit-password';
import { CdkAriaLive } from "../../../../node_modules/@angular/cdk/types/_a11y-module-chunk";
import { EditName } from '../edit-name/edit-name';
import { EditEmail } from '../edit-email/edit-email';
import { UserService } from '../../core/services/user.service';
import { User } from '../../interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';


type ViewMode = 'menu' | 'edit-name' | 'edit-email' | 'edit-password';

@Component({
  selector: 'app-edit-profile',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatListModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    EditPassword,
    EditName,
    EditEmail
  ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})

export class EditProfile {
  readonly dialogRef = inject(MatDialogRef<EditProfile>);
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);

  currentUser = signal<any>(null);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        console.log('Objeto recibido del backend:', data);
        this.currentUser.set(data);
      },
      error: (err) => console.error(err)
    });
  }

  currentView: ViewMode = 'menu';

  // Cambiar a la vista indicada
  setView(view: ViewMode): void {
    this.currentView = view;
  }

  // Regresar al menú principal
  goBack(): void {
    this.currentView = 'menu';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}






