export default {
  getByIssue(state) {
    return (issueId) => state.items.find((timer) => timer.issueId === issueId)
  },
  getRunning(state) {
    return state.items.filter((timer) => timer.isRunning === true)
  },
  getPaused(state) {
    return state.items.filter((timer) => timer.isPaused === true)
  }
}
