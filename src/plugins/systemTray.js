/*global __static*/
import path from 'path'
const { Menu, Tray } = require('electron').remote
const trayIcon = new Tray(path.join(__static, 'static/imgs/clock-off@2x.png'))

const trayMenuTemplate = [
  {
    label: 'Time Tracker',
    enabled: false
  },

  {
    label: 'Issues',
    click: function() {}
  }
]

const trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
trayIcon.setContextMenu(trayMenu)
