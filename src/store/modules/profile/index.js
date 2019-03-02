import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default function Profile() {
  return {
    namespaced: true,
    state: {
      items: [],
      current: {}
    },
    actions,
    mutations,
    getters
  }
}
