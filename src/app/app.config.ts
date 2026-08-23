import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { AppInitializeService } from 'core/services';
import { providePrimeNG } from 'primeng/config';
import { AppTheme } from './app-theme';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
       provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      })
    ),
    providePrimeNG(AppTheme),
    provideHttpClient(
      withInterceptors([])
    ),
     provideAppInitializer(() => inject(AppInitializeService).initialize()),
  ]
};
