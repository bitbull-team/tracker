import moment from 'moment'

export default {
  async record({ dispatch }, { issueId, comments, activityId, hours }) {
    await dispatch(
      'timeEntry/add',
      {
        issue_id: issueId,
        spent_on: moment().format('YYYY-MM-DD'),
        hours,
        activity_id: activityId,
        comments: comments
      },
      { root: true }
    )
    await dispatch(
      'notification/send',
      {
        title: `Tracked ${hours} hours on issue ${issueId}`
      },
      { root: true }
    )
    await dispatch(
      'timeEntry/loadToday',
      {},
      {
        root: true
      }
    )
  },
  openModal({ commit }, issueId) {
    commit('setIssue', issueId || null)
    commit('setModalOpen', true)
  }
}
