import actions from './actions'
import mutations from './mutations'

export default function timeEntryActivity() {
  return {
    namespaced: true,
    state: {
      items: []
    },
    actions,
    mutations
  }
}
