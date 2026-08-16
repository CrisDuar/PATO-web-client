import { Routes } from '@angular/router';
import {Registry} from './pages/registry/registry';
import {Principal} from './pages/principal/principal';

export const routes: Routes = [
  {path:'map',component: Principal},
  {path:'register', component: Registry},

];

