export default {
  sortBy: state => (index, descendant) => {
    let items = state.items.slice()

    items.sort((a, b) => a[index].id - b[index].id)

    if (descendant) {
      items.reverse()
    }

    return items
  }
}
