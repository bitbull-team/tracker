import electron from 'electron'

const currentWindow = electron.remote.getCurrentWindow()

export default {
	focus({}) {
		if (currentWindow.isVisible() === false) {
			currentWindow.show()
		}
		if (currentWindow.isFocused() === false) {
			currentWindow.focus()
		}
	},
	hide() {
		currentWindow.hide()
	}
}
