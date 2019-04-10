import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default function Timer() {
  return {
    namespaced: true,
    state: {
      items: []
    },
    actions,
    mutations,
    getters
  }
}
