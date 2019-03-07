import Vue from 'vue'
import VueI18n from 'vue-i18n'
import it from './messages/it'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: window.navigator.language.split('-')[0] || 'en',
  messages: {
    it
  }
})

export default i18n
