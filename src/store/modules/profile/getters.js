export default {
  isAtLeastOneConfigured(state) {
    return state.items.length > 0
  },
  getProfileById(state) {
    return id => state.items.find(item => item.id === id)
  },
  getProfileIndexById(state) {
    return id => state.items.findIndex(item => item.id === id)
  },
  getProfilesWithoutCurrent(state) {
    return state.items.filter(item => item.id !== state.current.id)
  }
}
