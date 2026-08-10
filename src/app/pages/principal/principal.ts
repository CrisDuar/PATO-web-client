import { Component } from '@angular/core';
import {NavbarPostlogin} from '../../components/navbar-postlogin/navbar-postlogin';

@Component({
  selector: 'app-principal',
  imports: [
    NavbarPostlogin
  ],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {}
