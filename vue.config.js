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
          icon: 'public/icons/mac/icon.icns',
          extendInfo: {
            LSUIElement: 1
          }
        },
        win: {
          icon: 'public/icons/win/icon.ico'
        },
        linux: {
          icon: 'public/icons/png/1024x1024.png'
        }
      }
    }
  }
}
