export default {
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
  }
}
