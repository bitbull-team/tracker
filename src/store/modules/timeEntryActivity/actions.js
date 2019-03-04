export default {
  loadAll({ commit, dispatch }) {
    return dispatch(
      'api/get',
      {
        path: 'enumerations/time_entry_activities.xml'
      },
      { root: true }
    ).then(response => {
      const entries = response.time_entry_activities
      commit('setItems', entries)
    })
  }
}
