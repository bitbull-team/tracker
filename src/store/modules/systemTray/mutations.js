export default {
  setCurrentIcon(state, icon) {
    state.currentIcon = icon
  },
  addMenuItem(state, menuItem) {
    state.menu.splice(state.customMenuAfterIndex, 0, menuItem)
    state.menu = state.menu.slice(0) //force state update
  },
  removeMenuItem(state, id) {
    const index = state.menu.findIndex(menuItem => menuItem.id === id)
    if (index === -1) {
      return
    }
    state.menu.splice(index, 1)
    state.menu = state.menu.slice(0) //force state update
  },
  updateMenuItem(state, newMenuItem) {
    const index = state.menu.findIndex(
      menuItem => menuItem.id === newMenuItem.id
    )
    if (index === -1) {
      return
    }
    state.menu[index] = newMenuItem
    state.menu = state.menu.slice(0) //force state update
  }
}
