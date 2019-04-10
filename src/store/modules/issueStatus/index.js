import actions from './actions'
import mutations from './mutations'

export default function IssueStatus() {
  return {
    namespaced: true,
    state: {
      items: []
    },
    actions,
    mutations
  }
}
