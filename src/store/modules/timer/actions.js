import moment from 'moment'

export default {
  start({ commit }, issueId) {
    commit('add', issueId)
  },
  pause({ commit }, issueId) {
    commit('pause', issueId)
  },
  resume({ commit }, issueId) {
    commit('resume', issueId)
  },
  async record(
    { commit, dispatch, state },
    { issueId, description, activityId }
  ) {
    const timer = state.items.find(timer => timer.issueId === issueId)
    if (timer === undefined) {
      return false
    }
    await dispatch(
      'api/add',
      {
        issue_id: timer.issueId,
        spent_on: moment(timer.start).format('YYYY-MM-DD'),
        hours: moment(timer.start).diff(
          moment(timer.end || new Date()),
          'hours'
        ),
        activity_id: activityId,
        comments: description
      },
      { root: true }
    )
    commit('delete', issueId)
  },
  discard({ commit }, issueId) {
    commit('delete', issueId)
  }
}
