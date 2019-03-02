import actions from './actions'
import mutations from './mutations'

export default function TimeEntries() {
  return {
    namespaced: true,
    state: {
      items: [],
      todayItems: [],
      thisWeekItems: [],
    },
    actions,
    mutations
  }
}
