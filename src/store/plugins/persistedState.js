import ElectronStore from 'electron-store'

export default options => {
  options = options || { key: 'db', excludes: [] }
  const storage = new ElectronStore(options.storage)

  return store => {
    const savedState = storage.get(options.key)

    if (typeof savedState === 'object' && savedState !== null) {
      store.replaceState(Object.assign(store.state, savedState))
    }

    store.subscribe((mutation) => {
      if (Array.isArray(options.excludes)) {
        const found = options.excludes.find((exclude) => mutation.type && mutation.type.startsWith(exclude))
        if (found !== undefined) {
          return;
        }
      }
      storage.set(options.key, store.state)
    })
  }
}
