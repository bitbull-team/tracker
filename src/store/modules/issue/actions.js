export default {
  loadWithFilter({ commit, dispatch }, filters) {
    return dispatch(
      'api/get',
      {
        path: 'issues.json',
        params: filters
      },
      { root: true }
    ).then(response => {
      const issues = response.issues
      commit('setItems', issues)
      return issues
    })
  },
  loadAll({ commit, dispatch }) {
    return dispatch(
      'api/get',
      {
        path: 'issues.json',
        params: {
          status_id: 'open'
        }
      },
      { root: true }
    ).then(response => {
      const issues = response.issues
      commit('setItems', issues)
      return issues
    })
  },
  loadAllMy({ commit, dispatch }) {
    return dispatch(
      'api/get',
      {
        path: 'issues.json',
        params: {
          status_id: 'open',
          assigned_to_id: 'me'
        }
      },
      { root: true }
    ).then(response => {
      const issues = response.issues
      commit('setItems', issues)
      return issues
    })
  },
  loadAllByProject({ commit, dispatch }, projectId) {
    return dispatch(
      'api/get',
      {
        path: 'issues.json',
        params: {
          status_id: 'open',
          project_id: projectId
        }
      },
      { root: true }
    ).then(response => {
      const issues = response.issues
      commit('setItems', issues)
      return issues
    })
  },
  loadAllMyByProject({ commit, dispatch }, projectId) {
    return dispatch(
      'api/get',
      {
        path: 'issues.json',
        params: {
          status_id: 'open',
          project_id: projectId,
          assigned_to_id: 'me'
        }
      },
      { root: true }
    ).then(response => {
      const issues = response.issues
      commit('setItems', issues)
      return issues
    })
  },
  loadSingle({ commit, dispatch }, issueId) {
    return dispatch(
      'api/get',
      {
        path: `issues/${issueId}.json`
      },
      { root: true }
    ).then(response => {
      if (response === undefined) {
        return null
      }
      const issue = response.issue
      commit('overrideItem', issue)
      return issue
    })
  },
  updateStatusIssue({ dispatch }, { issueId, status_id }) {
    return dispatch(
      'api/put',
      {
        path: `issues/${issueId}.json`,
        data: {
          issue: {
            status_id: status_id
          }
        }
      },
      { root: true }
    )
  }
}
