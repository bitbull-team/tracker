export default {
  loadAll({ commit, dispatch }) {
    return dispatch(
      'api/get',
      {
        path: 'projects.xml'
      },
      { root: true }
    ).then(response => {
      const projects = response.projects.project
      commit('setItems', projects)
    })
  }
}
