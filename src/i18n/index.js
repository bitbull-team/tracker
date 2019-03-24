import Vue from 'vue'
import VueI18n from 'vue-i18n'
import it from './messages/it'
import en from './messages/en'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: window.navigator.language.split('-')[0] || 'en',
  messages: {
    it,
    en
  }
})
const languages = ['it', 'en']

export default i18n
export { languages }
