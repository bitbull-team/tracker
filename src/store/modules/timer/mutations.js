import moment from 'moment'

export default {
  add(state, { id, issueId, comments, activityId }) {
    id = id || new Date().getTime()
    state.items.push({
      id,
      issueId,
      comments,
      activityId,
      duration: 0,
      startedAt: new Date(),
      isRunning: true
    })
    state.items = state.items.slice(0) //force state update
  },
  pause(state, id) {
    const timer = state.items.find(timer => timer.id === id)
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
  resume(state, id) {
    const timer = state.items.find(timer => timer.id === id)
    if (timer === undefined) {
      return false
    }
    timer.isRunning = true
    timer.resumedAt = new Date()
    delete timer.pausedAt
    state.items = state.items.slice(0) //force state update
  },
  delete(state, id) {
    const index = state.items.findIndex(timer => timer.id === id)
    if (index === -1) {
      return false
    }
    state.items.splice(index, 1)
    state.items = state.items.slice(0) //force state update
  }
}
