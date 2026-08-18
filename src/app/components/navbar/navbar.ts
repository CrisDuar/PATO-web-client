import { Component, inject, signal, model } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink} from "@angular/router";
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { EditProfile } from '../edit-profile/edit-profile';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, RouterLink, RouterModule, MatMenuModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly animal = signal(' ');
  readonly name = model(' ');
  readonly editProfile = inject(MatDialog);

  // Abrir el modal de editar perfil
  openEditProfile(): void {
    const dialogRef = this.editProfile.open(EditProfile, {
      width: '420px',
  });

  }
}
