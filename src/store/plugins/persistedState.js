import ElectronStore from 'electron-store'

export default options => {
  options = options || { key: 'db', excludes: [] }
  const storage = new ElectronStore(options.storage)

  return store => {
    const savedState = storage.get(options.key)

    if (typeof savedState === 'object' && savedState !== null) {
      if (Array.isArray(options.excludeState)) {
        for (const excludeState of options.excludeState) {
          delete savedState[excludeState];
        }
      }
      store.replaceState(Object.assign(store.state, savedState))
    }

    store.subscribe(mutation => {
      if (Array.isArray(options.excludeMutations)) {
        const found = options.excludeMutations.find(
          exclude => mutation.type && mutation.type.startsWith(exclude)
        )
        if (found !== undefined) {
          return
        }
      }
      const storeToSave = Object.assign({}, store.state)
      if (Array.isArray(options.excludeState)) {
        for (const excludeState of options.excludeState) {
          delete storeToSave[excludeState];
        }
      }
      storage.set(options.key, storeToSave)
    })
  }
}
