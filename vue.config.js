module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.bitbull.tracker',
        productName: 'Redmine Tracker',
        publish: null,
        asar: true,
        mac: {
          icon: 'icons/mac/icon.icns'
        },
        win: {
          icon: 'icons/win/icon.ico'
        },
        linux: {
          icon: 'icons/png/1024x1024.png'
        }
      }
    }
  }
}
