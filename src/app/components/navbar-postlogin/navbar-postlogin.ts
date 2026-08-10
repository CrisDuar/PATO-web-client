import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar-postlogin',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './navbar-postlogin.html',
  styleUrl: './navbar-postlogin.css',
})
export class NavbarPostlogin {}
