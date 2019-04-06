export default {
  setItems(state, items) {
    state.items = items
  },
  overrideItem(state, issue) {
    const index = state.items.findIndex(
      item => item !== null && item.id === issue.id
    )
    state.items[index] = issue
  }
}
