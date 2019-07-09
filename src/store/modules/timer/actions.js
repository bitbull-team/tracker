import moment from 'moment'

export default {
  async start({ commit, state, dispatch }, { issueId, comments, activityId }) {
    const runningTimer = state.items.find(timer => timer.isRunning === true)
    if (runningTimer !== undefined) {
      commit('pause', runningTimer.id)
    }
    const id = new Date().getTime()
    commit('add', { id, issueId, comments, activityId })
    await dispatch(
      'notification/send',
      {
        title: `New timer start for issue ${issueId}`
      },
      { root: true }
    )
    await dispatch('systemTray/addTimerControlPause', id, { root: true })
  },
  async pause({ state, commit, dispatch }, id) {
    const timer = state.items.find(timer => timer.id === id)
    if (timer === undefined) {
      return
    }
    commit('pause', timer.id)
    await dispatch('systemTray/addTimerControlResume', timer.id, { root: true })
    await dispatch(
      'notification/send',
      {
        title: `Paused timer for issue ${timer.issueId}`
      },
      { root: true }
    )
  },
  async resume({ commit, dispatch, state }, id) {
    const timer = state.items.find(timer => timer.id === id)
    if (timer === undefined) {
      return
    }
    const runningTimer = state.items.find(timer => timer.isRunning === true)
    if (runningTimer !== undefined) {
      commit('pause', runningTimer.id)
    }
    commit('resume', timer.id)
    await dispatch('systemTray/addTimerControlPause', timer.id, { root: true })
    await dispatch(
      'notification/send',
      {
        title: `Timer resumed for issue ${timer.issueId}`
      },
      { root: true }
    )
  },
  async record(
    { commit, dispatch, state, rootState },
    { id, issueId, comments, activityId }
  ) {
    let timer = state.items.find(timer => timer.id === id)
    if (timer === undefined) {
      return false
    }
    if (timer.isRunning === true) {
      commit('pause', timer.id)
    }

    timer = Object.assign(timer, { issueId, comments, activityId })

    let hours = moment
      .duration(Math.ceil(timer.duration), 'seconds')
      .as('hours')

    // perform approximation based on config
    let approximation = rootState.profile.current.timerApproximation
    let approximationEdge = approximation / 2
    let leftHours = hours % approximation

    if (leftHours < approximationEdge) {
      hours = hours - leftHours
    } else {
      hours = hours - leftHours + approximation
    }

    await dispatch(
      'timeEntry/add',
      {
        issue_id: timer.issueId,
        spent_on: moment(timer.startedAt).format('YYYY-MM-DD'),
        hours: hours,
        activity_id: timer.activityId,
        comments: timer.comments
      },
      { root: true }
    )
    await dispatch(
      'notification/send',
      {
        title: `Tracked ${hours} hours on issue ${timer.issueId}`
      },
      { root: true }
    )
    await dispatch('systemTray/removeTimerControl', id, {
      root: true
    })
    commit('delete', timer.id)
  },
  async discard({ commit, state, dispatch }, id) {
    let timer = state.items.find(timer => timer.id === id)
    if (timer === undefined) {
      return false
    }
    await dispatch('systemTray/removeTimerControl', timer.id, {
      root: true
    })
    commit('delete', timer.id)
  },
  async update(
    { commit, state, dispatch },
    { id, issueId, comments, activityId }
  ) {
    let timer = state.items.find(timer => timer.id === id)
    if (timer === undefined) {
      return false
    }
    commit('overrideItem', { id, issueId, comments, activityId })
  }
}
