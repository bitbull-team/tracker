import uuidv4 from 'uuid/v4'

export default {
  save({ commit, getters, state }, profile) {
    if (profile.id === undefined || profile.id === null) {
      profile.id = uuidv4()
      commit('pushItem', profile)
      return profile.id
    }

    const oldProfile = getters.getProfileById(profile.id)
    if (oldProfile === undefined) {
      throw `Profile with id ${profile.id} not found`
    }

    commit('overrideItem', profile)
    if (state.current && state.current.id === profile.id) {
      commit('setCurrent', profile)
    }
    return profile.id
  },
  delete({ commit, getters }, id) {
    const profile = getters.getProfileById(id)
    if (profile === undefined) {
      throw `Profile with id ${id} not found`
    }
    commit('deleteItem', id)
  },
  select({ commit, getters }, id) {
    const profileToSelect = getters.getProfileById(id)
    if (profileToSelect === undefined) {
      throw `Profile with id ${profile.id} not found`
    }
    commit('setCurrent', profileToSelect)
  }
}
