import { Routes } from '@angular/router';
import {Registry} from './pages/registry/registry/registry';
import {Principal} from './pages/principal/principal';
import { Login } from './auth/login/login';
import { MapViewer } from './pages/map-viewer/map-viewer';
import { Navbar } from './components/navbar/navbar';
import { ChatBOT } from './pages/chat-bot/chat-bot';
import { PredictionViewer } from './pages/prediction-viewer/prediction-viewer';

export const routes: Routes = [
  {path:'map',component: Principal},
  {path:'register', component: Registry},
  {path: '', component: Navbar},
  {path: 'map-viewer', component: MapViewer},
  {path: 'chat-bot', component: ChatBOT},
  {path: 'prediction-viewer', component: PredictionViewer},
];

