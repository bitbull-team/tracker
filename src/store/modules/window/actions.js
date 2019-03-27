import electron from 'electron'

const currentWindow = electron.remote.getCurrentWindow()
const ipcRenderer = electron.ipcRenderer

export default {
  focus() {
    ipcRenderer.send('force-show')
  },
  forceClose() {
    ipcRenderer.send('force-close')
  }
}
