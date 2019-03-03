/*global __static*/
import path from 'path'
import actions from './actions'
import mutations from './mutations'

export default function SystemTray() {
  return {
    namespaced: true,
    state: {
      menu: [
        {
          label: 'Show application',
          event: 'window/focus'
        },
        {
          label: 'Toggle notification',
          event: 'notification/togglePolling'
        }
      ],
      icons: {
        timerOff: path.join(__static, 'img/icons/clock-off@2x.png'),
        timerOn: path.join(__static, 'img/icons/clock-on@2x.png'),
      },
      currentIcon: 'timerOff',
    },
    actions,
    mutations
  }
}
