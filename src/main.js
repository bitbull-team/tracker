import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuelidate'
import './plugins/moment'
import './plugins/systemTray'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// this is just a test, needs to be moved in config
const lang = document.documentElement.lang.substr(0, 2)
import Locale from './locales/messages'
const i18n = new VueI18n({
  locale: lang,
  messages: Locale
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: function(h) {
    return h(App)
  }
}).$mount('#app')
