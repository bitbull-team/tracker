/*global __static*/
const path = require('path')
const { Tray } = require('electron')
const trayIcon = new Tray(path.join(__static, 'img/icons/clock-off@2x.png'))

module.exports = trayIcon
