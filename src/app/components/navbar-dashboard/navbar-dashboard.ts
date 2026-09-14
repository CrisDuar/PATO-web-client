import { Component, inject, signal, model } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink} from "@angular/router";
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { EditProfile } from '../edit-profile/edit-profile';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar-dashboard',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, RouterLink, RouterModule, MatMenuModule],
  templateUrl: './navbar-dashboard.html',
  styleUrl: './navbar-dashboard.css',
})
export class NavbarDashboard {}
