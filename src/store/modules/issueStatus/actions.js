export default {
  loadAll({ commit, dispatch }) {
    return dispatch(
      'api/get',
      {
        path: 'issue_statuses.json'
      },
      { root: true }
    ).then(response => {
      const issueStatuses = response.issue_statuses
      commit('setItems', issueStatuses)
    })
  },
  emptyItems({ commit }) {
    commit('setItems', [])
  }
}
