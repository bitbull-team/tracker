/*eslint no-console: ["error", { allow: ["error"] }] */
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
      .catch(error => {
        console.error(error.response)
      })

    commit('setCurrentUser', currentUser.user)
  },
  get({ rootState }, { path, params }) {
    const profile = rootState.profile.current
    return currentWindow
      .axios({
        method: 'GET',
        url: `${profile.url}/${path}`,
        params,
        headers: { 'X-Redmine-API-Key': profile.apiKey }
      })
      .then(response => response.data)
      .catch(error => {
        console.error(error.response)
      })
  },
  post({ rootState }, { path, data }) {
    const profile = rootState.profile.current
    return currentWindow
      .axios({
        method: 'POST',
        url: `${profile.url}/${path}`,
        data,
        headers: { 'X-Redmine-API-Key': profile.apiKey }
      })
      .then(response => response.data)
      .catch(error => {
        console.error(error.response)
      })
  },
  put({ rootState }, { path, data }) {
    const profile = rootState.profile.current
    return currentWindow
      .axios({
        method: 'PUT',
        url: `${profile.url}/${path}`,
        data,
        headers: { 'X-Redmine-API-Key': profile.apiKey }
      })
      .then(response => response.data)
      .catch(error => {
        console.error(error.response)
      })
  },
  delete({ rootState }, { path }) {
    const profile = rootState.profile.current
    return currentWindow
      .axios({
        method: 'DELETE',
        url: `${profile.url}/${path}`,
        headers: { 'X-Redmine-API-Key': profile.apiKey }
      })
      .then(response => response.data)
      .catch(error => {
        console.error(error.response)
      })
  }
}
