import actions from './actions'
import mutations from './mutations'

export default function Issue() {
  return {
    namespaced: true,
    state: {
      items: []
    },
    actions,
    mutations
  }
}
