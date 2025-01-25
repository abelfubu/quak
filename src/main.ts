import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './app/app.config'
import { AppComponent } from './app/app.component'
import { register } from '@tauri-apps/plugin-global-shortcut'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'

register('CommandOrControl+Shift+R', () => {
  getCurrentWebviewWindow().show()
})

bootstrapApplication(AppComponent, appConfig).catch(console.error)
