export default {
  loadToday({ commit, dispatch }) {
    return dispatch(
      'api/get',
      {
        path: 'time_entries.xml',
        params: {
          from: '2019-03-01',
          to: '2019-03-01',
          user_id: ''
        }
      },
      { root: true }
    ).then(response => {
      const timeEntries = response.time_entries.time_entry
      commit('setItems', timeEntries)
    })
  },
  loadThisWeek({ commit, dispatch }) {
    return dispatch(
      'api/get',
      {
        path: 'time_entries.xml',
        params: {
          from: '2019-03-01',
          to: '2019-03-01',
          user_id: ''
        }
      },
      { root: true }
    ).then(response => {
      const timeEntries = response.time_entries.time_entry
      commit('setItems', timeEntries)
    })
  }
}
