export default {
  loadAll({ commit, dispatch }) {
    return dispatch(
      'api/get',
      {
        path: 'projects.json'
      },
      { root: true }
    ).then(response => {
      const projects = response.projects
      commit('setItems', projects)
    })
  }
}
