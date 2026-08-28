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

export const routes: Routes = [
  {path:'register', component: Registry},
  {path:'accountRecovery', component: FindAccount},
  {path: '', component: Login},
  {path: 'map-viewer', component: MapViewer},
  {path: 'chat-bot', component: ChatBOT},
  {path: 'prediction-viewer', component: PredictionViewer},
  {path: 'verify-email', component: VerifyEmail},
  {path: 'reset-password', component: ResetPassword},
  
];

