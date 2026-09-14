import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'accountRecovery',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'col',
    renderMode: RenderMode.Client
  },
  {
    path: 'col-dept',
    renderMode: RenderMode.Client
  },
  {
    path: 'latin',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
