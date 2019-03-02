const electron = require('electron')
const currentWindow = electron.remote.getCurrentWindow()

export default {
  async loadCurrentUser({ rootState, commit }) {
    const profile = rootState.profile.current
    const currentUser = await currentWindow
      .axios({
        method: 'GET',
        url: `${profile.url}/users/current.json`,
        headers: { 'X-Redmine-API-Key': profile.apiKey }
      })
      .then(response => response.data)

    commit('setCurrentUser', currentUser.user)
  },
  get({ rootState }, { path, params }) {
    const profile = rootState.profile.current
    return currentWindow
      .axios({
        method: 'GET',
        url: `${profile.url}${path}`,
        params,
        headers: { 'X-Redmine-API-Key': profile.apiKey }
      })
      .then(response => response.data)
  },
  post({ rootState }, { path, data }) {
    const profile = rootState.profile.current
    return currentWindow
      .axios({
        method: 'POST',
        url: `${profile.url}${path}`,
        data,
        headers: { 'X-Redmine-API-Key': profile.apiKey }
      })
      .then(response => response.data)
  }
}
