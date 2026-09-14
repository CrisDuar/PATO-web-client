import { Routes } from '@angular/router';
import {Registry} from './pages/registry/registry';
import {Principal} from './pages/principal/principal';
import { Login } from './auth/login/login';
import { MapViewer } from './pages/map-viewer/map-viewer';
import { Navbar } from './components/navbar/navbar';
import { ChatBOT } from './pages/chat-bot/chat-bot';
import { PredictionViewer } from './pages/prediction-viewer/prediction-viewer';
import { FindAccount } from './pages/account-recovery/account-recovery';
import { VerifyEmail } from './pages/verify-email/verify-email';
import { ResetPassword } from './pages/reset-password/reset-password';
import { ColNational } from './pages/col-national/col-national';
import { LatinAmerica } from './pages/latin-america/latin-america';
import { ColDept } from './pages/col-dept/col-dept';
import { authGuard } from './core/guards/auth-guard';
import { authenticatedGuard } from './core/guards/authenticated-guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'register', component: Registry, canActivate: [authenticatedGuard]},
  {path:'accountRecovery', component: FindAccount, canActivate: [authenticatedGuard]},
  {path: 'login', component: Login, canActivate: [authenticatedGuard]},
  {path: 'col', component: ColNational, canActivate: [authGuard]},
  {path: 'col-dept', component: ColDept, canActivate: [authGuard]},
  {path: 'latin', component: LatinAmerica, canActivate: [authGuard]},
  {path: 'map-viewer', component: MapViewer, canActivate: [authGuard]},
  {path: 'chat-bot', component: ChatBOT, canActivate: [authGuard]},
  {path: 'prediction-viewer', component: PredictionViewer, canActivate: [authGuard]},
  {path: 'verify-email', component: VerifyEmail, canActivate: [authenticatedGuard]},
  {path: 'reset-password', component: ResetPassword, canActivate: [authenticatedGuard]},

  // Ruta comodín
  { path: '**', redirectTo: 'login' }
  
];

