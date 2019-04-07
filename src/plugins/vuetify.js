import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: {
      base: colors.blue.base,
      darken: colors.blue.darken1,
      lighten: colors.blue.lighten1
    },
    secondary: {
      base: colors.indigo.base,
      darken: colors.indigo.darken1,
      lighten: colors.indigo.lighten1
    },
    accent: {
      base: colors.pink.base,
      darken: colors.pink.darken1,
      lighten: colors.pink.lighten1
    },
    line: {
      base: colors.grey.base,
      darken: colors.grey.darken1,
      lighten: colors.grey.lighten3
    },
    error: {
      base: colors.red.base,
      darken: colors.red.darken1,
      lighten: colors.red.lighten1
    },
    warning: {
      base: colors.amber.base,
      darken: colors.amber.darken1,
      lighten: colors.amber.lighten1
    },
    info: {
      base: colors.cyan.base,
      darken: colors.cyan.darken1,
      lighten: colors.cyan.lighten1
    },
    success: {
      base: colors.lightGreen.base,
      darken: colors.lightGreen.darken1,
      lighten: colors.lightGreen.lighten1
    }
  },
  options: {
    customProperties: true
  }
})
