import actions from './actions'
import mutations from './mutations'

export default function API() {
  return {
    namespaced: true,
    state: {
      currentUser: null
    },
    actions,
    mutations,
  }
}
