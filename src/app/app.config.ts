import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations'
import { InjectSessionInterceptor } from './core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectSessionInterceptor,
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations()
  ]
};
