import Vue from 'vue'
import Vuex from 'vuex'
import PersistedState from './plugins/persistedState'
import API from './modules/api'
import Issue from './modules/issue'
import IssueStatus from './modules/issueStatus'
import Notification from './modules/notification'
import Profile from './modules/profile'
import Project from './modules/project'
import SystemTray from './modules/systemTray'
import TimeEntry from './modules/timeEntry'
import TimeEntryActivity from './modules/timeEntryActivity'
import Timer from './modules/timer'
import Window from './modules/window'
import Pomodoro from './modules/pomodoro'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    PersistedState({
      key: 'db',
      excludeMutations: [
        'notification/recordNotification',
        'notification/setPollingTimer',
        'notification/setSnackBar',
        'notification',
        'window',
        'api',
        'pomodoro'
      ],
      excludeState: ['notification', 'window', 'api', 'pomodoro']
    })
  ],
  modules: {
    api: new API(),
    issue: new Issue(),
    issueStatus: new IssueStatus(),
    notification: new Notification(),
    profile: new Profile(),
    project: new Project(),
    systemTray: new SystemTray(),
    timeEntry: new TimeEntry(),
    timeEntryActivity: new TimeEntryActivity(),
    timer: new Timer(),
    window: new Window(),
    pomodoro: new Pomodoro()
  }
})

export default store
