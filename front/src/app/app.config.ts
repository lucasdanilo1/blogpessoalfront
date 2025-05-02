import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxEchartsModule } from 'ngx-echarts';
import { tokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })
    ),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    importProvidersFrom(
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
      })
    )
  ]
};
