'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 8001 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',// dev时使用
  // publicPath: './',// build时使用
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    hot: true,//自动保存
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js'),
    /** dev环境下使用proxy代理，生产环境下注释此条后build */
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://192.168.0.253:8001/`,
        target: `http://192.168.0.111:8001/`,
        // target: `http://localhost:8080/`,
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }

    // proxy: {
    //   'test': {
    //     target: `http://localhost:8080/`,
    //     changeOrigin: true,
    //     ws: true,
    //     secure: false,
    //     pathRewrite: {
    //       '^test': ''
    //     }
    //   }
    // }

  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
  },
  transpileDependencies: [
    'element-ui',
    'vuex',
    'vue',
    'js-cookie',
    'xe-utils',
    'vxe-table',
    'elt-transfer',

    'axios',
    'babel-polyfill',
    'clipboard',
    'codemirror',
    'downloadjs',
    'driver.js',
    'dropzone',
  ],//这些是main.js中引入的，一一对应

  // transpileDependencies: [
  //     'axios',
  //     'babel-polyfill',
  //     'clipboard',
  //     'codemirror',
  //     'downloadjs',
  //     'driver.js',
  //     'dropzone'
  //   ],
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(options => {
        return {
          ...options,
          limit: 0 // 这个数值可以设置为很大，很大的话，打包之后的dist文件夹中就不会出现fonts目录了，因为这个时候所有的字体文件都被转成base64放到css文件中了
        }
      })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    // config.module
    //   .rule('css')
    //   .test(/\.css$/)
    //   .use('css-loader')
    //   .loader('css-loader')
    //   .loader('postcss-loader')
    //   .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // config.module
    //   .rule('jsx-px2rem-loader')
    //   .test(/\.js$/)
    //   .exclude
    //   .add([path.resolve('../src/pages/.umi'), path.resolve('node_modules')])
    //   .end()
    //   .use('../loader/jsx-px2rem-loader')
    //   .loader(path.join(__dirname, '../loader/jsx-px2rem-loader'))

    // config.module
    //   .rule('css')
    //   .test(/\.css$/)
    //   .use(["css-loader", "postcss-loader"])
    //   .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent
              },
              elementUI: {
                name: 'chunk-elementUI', // split elementUI into a single package
                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'), // can customize your rules
                minChunks: 3, //  minimum common number
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
    // config.entry('polyfill').add('babel-polyfill')
    // config.entry('polyfill').add('@babel/polyfill')
  },
}
