import Vue from 'vue'
import Vuex from 'vuex'
import PersistedState from './plugins/persistedState'
import Profile from './modules/profile'
import API from './modules/api'
import Project from './modules/project'
import TimeEntries from './modules/timeEntries'
import Notification from './modules/notification'
import SystemTray from './modules/systemTray';
import Window from './modules/window';

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    PersistedState({
      key: 'db',
      excludeMutations: [
        'notification/setPollingTimer',
        'notification/setPollingLastCheckNow',
        'notification/setPollingLastCheckNewNow',
        'systemTray',
        'window',
      ],
      excludeState: [
        'systemTray',
        'window'
      ]
    })
  ],
  modules: {
    profile: new Profile(),
    api: new API(),
    project: new Project(),
    timeEntries: new TimeEntries(),
    notification: new Notification(),
    systemTray: new SystemTray(),
    window: new Window(),
  }
})

export default store
