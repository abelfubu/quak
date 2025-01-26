import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'

import { routes } from './app.routes'
import { SettingsService } from './core/settings/settings.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideExperimentalZonelessChangeDetection(),
    provideAppInitializer(() => inject(SettingsService).load()),
  ],
}
