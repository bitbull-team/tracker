import actions from './actions'
import mutations from './mutations'

export default function Timer() {
  return {
    namespaced: true,
    state: {
      issueId: null,
      modalOpen: false
    },
    actions,
    mutations
  }
}
