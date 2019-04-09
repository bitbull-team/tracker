import electron from 'electron'
import moment from 'moment'

const currentWindow = electron.remote.getCurrentWindow()

export default {
  send({ commit, state }, { title, options, callback, issues }) {
    if (state.inApp === false && currentWindow.isFocused() === false) {
      const notification = new Notification(
        title,
        Object.assign(state.defaultOption, options || {})
      )
      notification.onclick = () => {
        if (currentWindow.isVisible() === false) {
          currentWindow.show()
        }
        if (currentWindow.isFocused() === false) {
          currentWindow.focus()
        }
        if (callback) callback()
      }
    } else {
      commit('setSnackBar', title)
    }
    commit('setLastNewNow')

    commit('recordNotification', {
      title,
      issues,
      date: new Date()
    })
  },
  togglePolling({ commit, dispatch, state }) {
    if (state.polling.enable === true) {
      commit('setPollingEnable', false)
      dispatch('stopPolling')
    } else {
      commit('setPollingEnable', true)
      dispatch('startPolling')
    }
  },
  startPolling({ commit, state, dispatch }) {
    if (state.polling.enable === false) {
      commit('setPollingTimer', null)
      return
    }
    commit(
      'setPollingTimer',
      setInterval(() => {
        dispatch('retrieveNewNotification')
      }, state.polling.interval || 10 * 1000)
    )
    dispatch('send', {
      title: 'Start notification polling'
    })
  },
  stopPolling({ commit, state, dispatch }) {
    if (state.polling.timer === null) {
      return
    }
    clearInterval(state.polling.timer)
    commit('setPollingTimer', null)
    dispatch('send', {
      title: 'Stop notification polling'
    })
  },
  async retrieveNewNotification({ dispatch, state, commit }) {
    const response = await dispatch(
      'api/get',
      {
        path: 'issues.json',
        params: {
          updated_on:
            '>=' +
            moment(state.polling.lastCheck).format('YYYY-MM-DDTHH:mm:ss') +
            'Z'
        }
      },
      { root: true }
    )
    commit('setPollingLastCheckNow')
    if (response.total_count === 0) {
      return
    }
    commit('setLastNewNow')
    dispatch('send', {
      title: `${response.total_count} Issue${
        response.total_count > 1 ? 's' : ''
      } updated`,
      issues: response.issues
    })
  }
}
