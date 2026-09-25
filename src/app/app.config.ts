import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideHighlightOptions } from 'ngx-highlightjs';

import { routes } from './app.routes';
import { angularHtml } from './pages/showcase/angular-html-language';
import { PageTitleStrategy } from './page-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        json: () => import('highlight.js/lib/languages/json'),
        bash: () => import('highlight.js/lib/languages/bash'),
        scss: () => import('highlight.js/lib/languages/scss'),
        html: () =>
          import('highlight.js/lib/languages/xml').then((m) => ({
            default: angularHtml(m.default),
          })),
      },
    }),
  ],
};
