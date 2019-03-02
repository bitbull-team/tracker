const convert = require('xml-js')
const electron = require('electron')
const currentWindow = electron.remote.getCurrentWindow()

function parseResponse(response) {
  return JSON.parse(
    convert.xml2json(response.data, {
      compact: true,
      spaces: 4,
      textKey: 'text'
    })
  )
}

export default {
  get({ rootState }, { path, params }) {
    const profile = rootState.profile.current
    return currentWindow
      .axios({
        method: 'GET',
        url: `${profile.url}${path}`,
        params,
        headers: { 'X-Redmine-API-Key': profile.apiKey }
      })
      .then(parseResponse)
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
      .then(parseResponse)
  }
}
