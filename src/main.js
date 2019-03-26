import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuelidate'
import './plugins/moment'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: function(h) {
    return h(App)
  }
}).$mount('#app')
