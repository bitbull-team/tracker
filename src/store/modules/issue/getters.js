export default {
  sortBy: state => (index, descendant) => {
    state.items.sort((a, b) => a[index].id - b[index].id)

    if (descendant) {
      state.items.reverse()
    }

    return state.items
  }
}
