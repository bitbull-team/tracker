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
        appId: 'com.bitbull.tracker'
      }
    }
  }
}
