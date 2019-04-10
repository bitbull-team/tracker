import actions from './actions'
import mutations from './mutations'

export default function TimeEntry() {
  return {
    namespaced: true,
    state: {
      items: [],
      todayItems: [],
      thisWeekItems: [],
      thisMonthItems: []
    },
    actions,
    mutations
  }
}
