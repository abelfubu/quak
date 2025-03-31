import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { provideHttpClient, withInterceptors } from '@angular/common/http'

import { routes } from './app.routes'
import { SettingsService } from './core/settings/settings.service'
import { cacheInterceptor } from './core/interceptors/cache.interceptor'
import { loaderInterceptor } from './core/interceptors/loader.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([cacheInterceptor, loaderInterceptor])),
    provideExperimentalZonelessChangeDetection(),
    provideAppInitializer(() => inject(SettingsService).load()),
  ],
}
