const electron = require('electron')
const currentWindow = electron.remote.getCurrentWindow()
const { Menu } = electron.remote
const trayIcon = currentWindow.systemTray;

const trayMenuTemplate = [
  {
    label: 'Time Tracker',
    enabled: false
  },

  {
    label: 'Issues test',
    click: function() {}
  }
]

const trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
trayIcon.setContextMenu(trayMenu)
