import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarPrelogin} from './components/navbar-prelogin/navbar-prelogin';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PATO-web-client');
}
