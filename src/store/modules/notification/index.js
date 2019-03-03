/*global __static*/
import path from 'path'

import actions from './actions'
import mutations from './mutations'

export default function Notification() {
  return {
    namespaced: true,
    state: {
      items: [],
      limit: 10,
      inApp: false,
      snackBar: null,
      defaultOption: {
        icon: path.join(__static, 'static/imgs/clock-off@2x.png')
      },
      polling: {
        enable: false, //NOTE: this internally disable notification system
        timer: null,
        lastCheck: new Date(),
        lastNew: null,
        interval: 10 * 1000
      }
    },
    actions,
    mutations
  }
}
