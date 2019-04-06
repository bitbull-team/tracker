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
        },
        {
          label: '-----------------------------',
          enabled: false
        },
        {
          label: 'Start extra timer',
          event: 'timer/startExtra'
        },
        {
          label: '-----------------------------',
          enabled: false
        },
        {
          label: 'Close',
          event: 'window/forceClose'
        }
      ],
      icons: {
        timerOff: path.join(__static, 'tray/clock-off@2x.png'),
        timerOn: path.join(__static, 'tray/clock-on@2x.png')
      },
      currentIcon: 'timerOff',
      customMenuAfterIndex: 4
    },
    actions,
    mutations
  }
}
