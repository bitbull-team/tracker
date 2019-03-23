import moment from 'moment'

export default {
  add(state, { issueId, comments, activityId }) {
    state.items.push({
      issueId,
      comments,
      activityId,
      duration: 0,
      startedAt: new Date(),
      isRunning: true
    })
    state.items = state.items.slice(0) //force state update
  },
  pause(state, issueId) {
    const timer = state.items.find(timer => timer.issueId === issueId)
    if (timer === undefined) {
      return false
    }
    const from =
      timer.resumedAt !== undefined ? timer.resumedAt : timer.startedAt
    timer.duration += moment.duration(moment().diff(from)).as('seconds')
    timer.pausedAt = new Date()
    timer.isRunning = false
    state.items = state.items.slice(0) //force state update
  },
  resume(state, issueId) {
    const timer = state.items.find(timer => timer.issueId === issueId)
    if (timer === undefined) {
      return false
    }
    timer.isRunning = true
    timer.resumedAt = new Date()
    delete timer.pausedAt
    state.items = state.items.slice(0) //force state update
  },
  delete(state, issueId) {
    const index = state.items.findIndex(timer => timer.issueId === issueId)
    if (index === -1) {
      return false
    }
    state.items.splice(index, 1)
    state.items = state.items.slice(0) //force state update
  }
}
