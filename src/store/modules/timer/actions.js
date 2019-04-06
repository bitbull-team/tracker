import moment from 'moment'

export default {
  async start({ commit, state, dispatch }, { issueId, comments, activityId }) {
    const runningTimer = state.items.find(timer => timer.isRunning === true)
    if (runningTimer !== undefined) {
      commit('pause', runningTimer.issueId)
    }
    const duplicatedTimer = state.items.find(timer => timer.issueId === issueId)
    if (duplicatedTimer !== undefined) {
      commit('resume', duplicatedTimer.issueId)
      await dispatch(
        'notification/send',
        {
          title: `Timer resumed for issue ${issueId}`
        },
        { root: true }
      )
    } else {
      commit('add', { issueId, comments, activityId })
      await dispatch(
        'notification/send',
        {
          title: `New timer start for issue ${issueId}`
        },
        { root: true }
      )
    }
    await dispatch('systemTray/addTimerControlPause', issueId, { root: true })
  },
  async pause({ commit, dispatch }, issueId) {
    commit('pause', issueId)
    await dispatch('systemTray/addTimerControlResume', issueId, { root: true })
    await dispatch(
      'notification/send',
      {
        title: `Paused timer for issue ${issueId}`
      },
      { root: true }
    )
  },
  async resume({ commit, dispatch }, issueId) {
    commit('resume', issueId)
    await dispatch('systemTray/addTimerControlPause', issueId, { root: true })
    await dispatch(
      'notification/send',
      {
        title: `Timer resumed for issue ${issueId}`
      },
      { root: true }
    )
  },
  async record({ commit, dispatch, state }, { issueId, comments, activityId }) {
    let timer = state.items.find(timer => timer.issueId === issueId)
    if (timer === undefined) {
      return false
    }
    if (timer.isRunning === true) {
      commit('pause', issueId)
      timer = state.items.find(timer => timer.issueId === issueId)
    }

    timer = Object.assign(timer, { comments, activityId })

    const hours = moment.duration(timer.duration, 'seconds').as('hours')

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
    await dispatch('systemTray/removeTimerControlForIssue', issueId, {
      root: true
    })
    commit('delete', issueId)
  },
  discard({ commit }, issueId) {
    commit('delete', issueId)
  }
}
