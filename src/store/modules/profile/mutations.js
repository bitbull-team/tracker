import i18n from '@/i18n'

export default {
  pushItem(state, profile) {
    state.items.push(profile)
  },
  overrideItem(state, profile) {
    const index = state.items.findIndex(item => item.id === profile.id)
    state.items[index] = profile
  },
  deleteItem(state, id) {
    const index = state.items.findIndex(item => item.id === id)
    state.items.splice(index, 1)
  },
  setCurrent(state, profile) {
    state.current = profile
    i18n.locale =
      state.current.language ||
      (window.navigator.language.split('-')[0] || 'en')
  }
}
