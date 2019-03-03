export default {
  recordNotification(state, item) {
    state.items.push(item)
    if (state.items.length > state.limit) {
      state.items.shift()
    }
  },
  setSnackBar(state, snackBar) {
    state.snackBar = snackBar
  },
  setPollingEnable(state, status) {
    state.polling.enable = status
  },
  setPollingTimer(state, timer) {
    state.polling.timer = timer
  },
  setPollingLastCheckNow(state) {
    state.polling.lastCheck = new Date()
  },
  setPollingLastCheckNewNow(state) {
    state.polling.lastNew = new Date()
  }
}
