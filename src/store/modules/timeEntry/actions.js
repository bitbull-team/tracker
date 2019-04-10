import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  loadToday({ commit, dispatch, rootState }) {
    return dispatch(
      'api/get',
      {
        path: 'time_entries.json',
        params: {
          from: moment().format(DATE_FORMAT),
          to: moment().format(DATE_FORMAT),
          user_id: rootState.api.currentUser.id
        }
      },
      { root: true }
    ).then(response => {
      const timeEntries = response.time_entries
      commit('setTodayItems', timeEntries)
    })
  },
  loadThisWeek({ commit, dispatch, rootState }) {
    return dispatch(
      'api/get',
      {
        path: 'time_entries.json',
        params: {
          from: moment()
            .startOf('isoWeek')
            .format(DATE_FORMAT),
          to: moment().format(DATE_FORMAT),
          user_id: rootState.api.currentUser.id,
          limit: 1000
        }
      },
      { root: true }
    ).then(response => {
      const timeEntries = response.time_entries
      commit('setThisWeekItems', timeEntries)
    })
  },
  loadThisMonth({ commit, dispatch, rootState }) {
    return dispatch(
      'api/get',
      {
        path: 'time_entries.json',
        params: {
          from: moment()
            .startOf('month')
            .format(DATE_FORMAT),
          to: moment().format(DATE_FORMAT),
          user_id: rootState.api.currentUser.id,
          limit: 1000
        }
      },
      { root: true }
    ).then(response => {
      const timeEntries = response.time_entries
      commit('setThisMonthItems', timeEntries)
    })
  },
  add({ dispatch }, timeEntry) {
    return dispatch(
      'api/post',
      {
        path: 'time_entries.json',
        data: {
          time_entry: timeEntry
        }
      },
      { root: true }
    )
  }
}
