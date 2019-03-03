import Vue from 'vue'
import path from 'path'
import electron from 'electron'

const currentWindow = electron.remote.getCurrentWindow()
const defaultOption = {
    icon: path.join(__static, 'static/imgs/clock-off@2x.png')
}

Vue.prototype.$systemNotify = {}
Vue.prototype.$systemNotify.send = (title, callback, options) => {
    const notification = new Notification(title, Object.assign(defaultOption, options || {}));
    notification.onclick = () => {
        if (currentWindow.isVisible() === false) {
            currentWindow.show()
        }
        if (currentWindow.isFocused() === false) {
            currentWindow.focus()
        }
        if (callback) callback()
    }
}
