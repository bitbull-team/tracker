export default {
  add(state, issueId) {
    state.items.push({
      issueId,
      start: new Date(),
      end: null,
      isRunning: true,
      isPaused: false
    })
  },
  pause(state, issueId) {
    const timer = state.items.find(timer => timer.issueId === issueId)
    if (timer === undefined) {
      return false
    }
    timer.isRunning = false
    timer.isPaused = true
    timer.end = new Date()
  },
  resume(state, issueId) {
    const timer = state.items.find(timer => timer.issueId === issueId)
    if (timer === undefined) {
      return false
    }
    timer.isRunning = true
    timer.isPaused = false
    timer.end = null
  },
  delete(state, issueId) {
    const index = state.items.findIndex(timer => timer.issueId === issueId)
    if (index === -1) {
      return false
    }
    state.items.splice(index, 1)
  }
}
