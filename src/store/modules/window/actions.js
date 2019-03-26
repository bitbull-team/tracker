import electron from 'electron'

const currentWindow = electron.remote.getCurrentWindow()
const ipcRenderer = electron.ipcRenderer

export default {
  focus() {
    if (currentWindow.isVisible() === false) {
      currentWindow.show()
    }
    if (currentWindow.isFocused() === false) {
      currentWindow.focus()
    }
  },
  hide() {
    currentWindow.hide()
  },
  forceClose() {
    ipcRenderer.send('force-close')
  }
}
