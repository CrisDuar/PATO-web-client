import { Routes } from '@angular/router';
import {Registry} from './pages/registry/registry/registry';
import {Principal} from './pages/principal/principal';
import { Login } from './auth/login/login';

export const routes: Routes = [
  {path:'map',component: Principal},
  {path:'register', component: Registry},
  {path: '', component:Login},
];

