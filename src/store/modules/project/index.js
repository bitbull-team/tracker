import actions from './actions'
import mutations from './mutations'

export default function Project() {
  return {
    namespaced: true,
    state: {
      items: []
    },
    actions,
    mutations
  }
}
