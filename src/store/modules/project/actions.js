export default {
  loadAll({ commit, dispatch }) {
    return dispatch(
      'api/get',
      {
        path: 'projects.json',
        params: {
          limit: 200
        }
      },
      { root: true }
    ).then(response => {
      const projects = response.projects.sort((a, b) => a.name > b.name)
      commit('setItems', projects)
    })
  }
}
