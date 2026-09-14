import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Client },
  { path: 'col', renderMode: RenderMode.Client },
  { path: 'col-dept', renderMode: RenderMode.Client },
  { path: 'latin', renderMode: RenderMode.Client },
  
  { path: 'login', renderMode: RenderMode.Prerender },
  
  { path: '**', renderMode: RenderMode.Client }
];
