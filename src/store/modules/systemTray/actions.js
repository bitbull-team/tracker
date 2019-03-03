import electron from 'electron'

const { Menu } = electron.remote
const currentWindow = electron.remote.getCurrentWindow()
const trayIcon = currentWindow.systemTray

export default {
  drawMenu({ state, dispatch }) {
    const trayMenuTemplate = []

    for (const menuItem of state.menu) {
      trayMenuTemplate.push({
        label: menuItem.label,
        click: () => {
          dispatch(menuItem.event, null, {root: true})
        }
      })
    }
    
    const trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
    trayIcon.setContextMenu(trayMenu)
  },
  changeIcon({commit, state}, iconName) {
    if (typeof state.icons[iconName] === 'undefined') {
      throw `Icon name '${iconName}' not found`
    }
    trayIcon.setImage(state.icons[iconName])
    commit('setCurrentIcon', iconName)
  }
}
