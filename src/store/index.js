import Vue from 'vue'
import Vuex from 'vuex'
import PersistedState from './plugins/persistedState'
import Profile from './modules/profile'
import API from './modules/api'
import Project from './modules/project'
import TimeEntries from './modules/timeEntries'
import Notification from './modules/notification'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    PersistedState({
      key: 'db',
      excludes: [
        'notification/setPollingTimer', 
        'notification/setPollingLastCheckNow', 
        'notification/setPollingLastCheckNewNow'
      ]
    })
  ],
  modules: {
    profile: new Profile(),
    api: new API(),
    project: new Project(),
    timeEntries: new TimeEntries(),
    notification: new Notification(),
  }
})

export default store
