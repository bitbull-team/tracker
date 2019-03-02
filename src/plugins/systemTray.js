import path from 'path'
const {Menu, Tray} = require('electron').remote
const trayIcon = new Tray(path.join(__static,'static/imgs/logo.png'))

const trayMenuTemplate = [
	{
		label: 'Time Tracker',
		enabled: false
	},

	{
		label: 'Issues',
		click: function () {
			console.log('Clicked on issues')
		}
	},
]

const trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
trayIcon.setContextMenu(trayMenu)

