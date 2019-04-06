import electron from 'electron'

const currentWindow = electron.remote.getCurrentWindow()
const app = electron.remote.app
const ipcRenderer = electron.ipcRenderer

export default {
  focus() {
    if (currentWindow.isVisible() === false) {
      currentWindow.show()
    }
    if (currentWindow.isFocused() === false) {
      currentWindow.focus()
    }
    if (app.dock !== undefined) {
      app.dock.show()
    }
  },
  hide() {
    currentWindow.hide()
    if (app.dock !== undefined) {
      app.dock.hide()
    }
  },
  forceClose() {
    ipcRenderer.send('force-close')
  }
}
