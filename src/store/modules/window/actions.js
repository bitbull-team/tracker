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
    app.dock.show()
  },
  hide() {
    currentWindow.hide()
    app.dock.show()
  },
  forceClose() {
    ipcRenderer.send('force-close')
  }
}
