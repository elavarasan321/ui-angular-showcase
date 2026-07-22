import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { CLIPBOARD_OPTIONS, provideMarkdown } from 'ngx-markdown';

import { routes } from './app.routes';
import { MarkdownCopyButton } from './pages/showcase/markdown-copy-button';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideMarkdown({
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {
          buttonComponent: MarkdownCopyButton,
        },
      },
    }),
  ],
};
