/*global __static*/
const path = require('path')
const { Tray } = require('electron')
const trayIcon = new Tray(path.join(__static, 'static/imgs/clock-off@2x.png'))

module.exports = trayIcon
