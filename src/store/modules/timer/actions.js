import moment from 'moment'

export default {
  start({ commit, state }, { issueId, comments, activityId }) {
    const runningTimer = state.items.find(timer => timer.isRunning === true)
    if (runningTimer !== undefined) {
      commit('pause', runningTimer.issueId)
    }
    const duplicatedTimer = state.items.find(timer => timer.issueId === issueId)
    if (duplicatedTimer !== undefined) {
      commit('resume', duplicatedTimer.issueId)
    } else {
      commit('add', { issueId, comments, activityId })
    }
  },
  pause({ commit }, issueId) {
    commit('pause', issueId)
  },
  resume({ commit }, issueId) {
    commit('resume', issueId)
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

    await dispatch(
      'timeEntry/add',
      {
        issue_id: timer.issueId,
        spent_on: moment(timer.startedAt).format('YYYY-MM-DD'),
        hours: moment.duration(timer.duration, 'seconds').as('hours'),
        activity_id: timer.activityId,
        comments: timer.comments
      },
      { root: true }
    )
    commit('delete', issueId)
  },
  discard({ commit }, issueId) {
    commit('delete', issueId)
  }
}
