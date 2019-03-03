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
  togglePolling({ commit, dispatch }, status) {
    if (status === true) {
      commit('setPollingEnable', true)
      dispatch('startPolling')
    } else {
      commit('setPollingEnable', false)
      dispatch('stopPolling')
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
  },
  stopPolling({ commit, state }) {
    if (state.polling.timer === null) {
      return
    }
    clearInterval(state.polling.timer)
    commit('setPollingTimer', null)
  },
  async retrieveNewNotification({ dispatch, state, commit }) {
    const response = await dispatch(
      'api/get',
      {
        path: 'issues.json',
        params: {
          updated_on:
            '>=' +
            moment(state.polling.lastCheck).format('YYYY-MM-DDThh:mm:ss') +
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
