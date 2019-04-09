export default {
  async loadAll({ commit, dispatch }) {
    const pagination = 100
    let offset = 0
    let projects = []
    let response = null

    do {
      response = await await dispatch(
        'api/get',
        {
          path: 'projects.json',
          params: {
            limit: 100,
            offset: offset
          }
        },
        { root: true }
      )
      projects = projects.concat(response.projects)
      offset += pagination
    } while (response.projects.length === pagination)

    commit('setItems', projects)
  }
}
