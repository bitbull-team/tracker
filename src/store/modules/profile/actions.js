import uuidv4 from 'uuid/v4'

export default {
  save({ commit, getters }, profile) {
    if (profile.id === undefined || profile.id === null) {
      profile.id = uuidv4()
      commit('pushItem', profile)
      return
    }

    const oldProfile = getters.getProfileById(profile.id)
    if (oldProfile === undefined) {
      throw `Profile with id ${profile.id} not found`
    }

    commit('overrideItem', profile)
  },
  delete({ commit, getters }, id) {
    const profile = getters.getProfileById(id)
    if (profile === undefined) {
      throw `Profile with id ${id} not found`
    }
    commit('deleteItem', id)
  },
  select({ commit, getters }, profile) {
    const profileToSelect = getters.getProfileById(profile.id)
    if (profileToSelect === undefined) {
      throw `Profile with id ${profile.id} not found`
    }
    commit('setCurrent', profileToSelect)
  }
}
