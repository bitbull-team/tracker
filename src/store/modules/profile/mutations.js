import getters from './getters'

export default {
  pushItem(state, profile) {
    state.items.push(profile)
  },
  overrideItem(state, profile) {
    const index = getters.getProfileIndexById(profile.id)
    state.items[index] = profile
  },
  deleteItem(state, id) {
    const index = getters.getProfileIndexById(id)
    state.items.splice(index, 1)
  },
  setCurrent(state, profile) {
    state.current = profile
  }
}
