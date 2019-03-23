import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: {
      base: colors.blue.base,
      darken1: colors.blue.darken2
    },
    secondary: colors.indigo,
    tertiary: colors.green.darken2
  },
  options: {
    customProperties: true
  }
})
