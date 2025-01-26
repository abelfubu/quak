import { bootstrapApplication } from '@angular/platform-browser'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { register } from '@tauri-apps/plugin-global-shortcut'
import { AppComponent } from './app/app.component'
import { appConfig } from './app/app.config'

register('CommandOrControl+Shift+R', async (event) => {
  try {
    if (event.state === 'Released') {
      const window = getCurrentWebviewWindow()
      await window.show()
      await window.setFocus()
    }
  } catch (error) {
    console.error(error)
  }
})

bootstrapApplication(AppComponent, appConfig).catch(console.error)
