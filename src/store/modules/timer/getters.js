export default {
  getByIssue(state) {
    return issueId => state.items.find(timer => timer.issueId === issueId)
  },
  getRunning(state) {
    return state.items.find(timer => timer.isRunning === true)
  },
  getPaused(state) {
    return state.items.filter(timer => timer.isRunning === false)
  },
  getMoreRecent(state) {
    const sorted = state.items.sort((a, b) => {
      if (a.pausedAt !== undefined && b.pausedAt !== undefined) {
        return new Date(b.pausedAt).getTime() - new Date(a.pausedAt).getTime()
      }
      if (a.pausedAt !== undefined && b.pausedAt === undefined) {
        return new Date(b.startedAt).getTime() - new Date(a.pausedAt).getTime()
      }
      if (a.pausedAt === undefined && b.pausedAt !== undefined) {
        return new Date(b.pausedAt).getTime() - new Date(a.startedAt).getTime()
      }

      return new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    })
    return sorted[0]
  }
}
