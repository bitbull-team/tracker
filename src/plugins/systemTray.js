import Vue from 'vue'
import electron from 'electron'

const currentWindow = electron.remote.getCurrentWindow()
const { Menu } = electron.remote
const trayIcon = currentWindow.systemTray

const trayMenuTemplate = [
  {
    label: 'Show application',
    click: () => {
      if(currentWindow.isVisible() === false){
        currentWindow.show()
      }
      if(currentWindow.isFocused() === false){
        currentWindow.focus()
      }
    }
  }
]

const trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
trayIcon.setContextMenu(trayMenu)
