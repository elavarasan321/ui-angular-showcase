import { Routes } from '@angular/router';
import { SHOWCASE_PAGE_GROUPS } from './showcase-pages';

export const routes: Routes = [
  { path: '', redirectTo: 'getting-started', pathMatch: 'full' },
  ...SHOWCASE_PAGE_GROUPS.flatMap((group) =>
    group.pages.map((page) => ({
      path: page.route,
      loadComponent: page.loadComponent,
      title: page.title ?? page.label,
    })),
  ),
  // Must stay last: matches any path not claimed above.
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Page Not Found',
  },
];
