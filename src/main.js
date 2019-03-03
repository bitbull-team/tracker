import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuelidate'
import './plugins/moment'
import './plugins/systemTray'
import './plugins/systemNotification'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function(h) {
    return h(App)
  }
}).$mount('#app')
