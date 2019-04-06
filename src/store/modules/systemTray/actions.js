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
        type: menuItem.type || 'normal',
        sublabel: menuItem.sublabel,
        enabled: menuItem.enabled === undefined ? true : menuItem.enabled,
        click: () => {
          if (menuItem.event) {
            dispatch(menuItem.event, menuItem.params || null, { root: true })
          }
        }
      })
    }

    const trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
    trayIcon.setContextMenu(trayMenu)
  },
  changeIcon({ commit, state }, iconName) {
    if (typeof state.icons[iconName] === 'undefined') {
      throw `Icon name '${iconName}' not found`
    }
    trayIcon.setImage(state.icons[iconName])
    commit('setCurrentIcon', iconName)
  },
  addCustomMenuItem({ commit, state, dispatch }, { label, event, params, id }) {
    if (!label || !event) {
      throw `Label and event are required parameters`
    }
    id = id || label.replace(' ', '-').toLowercase()
    const duplicated = state.menu.find(menuItem => menuItem.id === id)
    if (duplicated !== undefined) {
      return
    }
    commit('addMenuItem', { label, event, params, id })
    dispatch('drawMenu')
  },
  removeCustomMenu({ commit, dispatch }, id) {
    commit('removeMenuItem', id)
    dispatch('drawMenu')
  },
  addTimerControlPause({ commit, state, dispatch }, issueId) {
    const duplicated = state.menu.find(
      menuItem => menuItem.id === 'pause-current-timer'
    )
    if (duplicated !== undefined) {
      commit('updateMenuItem', Object.assign(duplicated, { params: issueId }))
    } else {
      commit('addMenuItem', {
        label: 'Pause current timer',
        event: 'timer/pause',
        params: issueId,
        id: 'pause-current-timer'
      })
    }
    commit('removeMenuItem', 'resume-last-timer')
    dispatch('drawMenu')
  },
  addTimerControlResume({ commit, state, dispatch }, issueId) {
    const duplicated = state.menu.find(
      menuItem => menuItem.id === 'resume-last-timer'
    )
    if (duplicated !== undefined) {
      commit('updateMenuItem', Object.assign(duplicated, { params: issueId }))
    } else {
      commit('addMenuItem', {
        label: 'Resume last timer',
        event: 'timer/resume',
        params: issueId,
        id: 'resume-last-timer'
      })
    }
    commit('removeMenuItem', 'pause-current-timer')
    dispatch('drawMenu')
  },
  removeTimerControlForIssue({ commit, dispatch }, issueId) {
    const menuItemToRemove = state.menu.find(menuItem.params === issueId)
    if (menuItemToRemove === undefined) {
      return
    }
    commit('removeMenuItem', menuItemToRemove.id)
    dispatch('drawMenu')
  }
}
