import ElectronStore from 'electron-store'

export default options => {
  options = options || { key: 'db' }
  const storage = new ElectronStore(options.storage)

  return store => {
    const savedState = storage.get(options.key)

    if (typeof savedState === 'object' && savedState !== null) {
      store.replaceState(Object.assign(store.state, savedState))
    }

    store.subscribe(() => {
      storage.set(options.key, store.state)
    })
  }
}
