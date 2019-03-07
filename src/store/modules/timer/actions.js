import moment from 'moment'

export default {
  start({ commit }, { issueId, comments, activityId }) {
    commit('add', { issueId, comments, activityId })
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
    timer = Object.assign(timer, { comments, activityId })

    await dispatch(
      'api/add',
      {
        issue_id: timer.issueId,
        spent_on: moment(timer.start).format('YYYY-MM-DD'),
        hours: moment(timer.start).diff(
          moment(timer.end || new Date()),
          'hours'
        ),
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
