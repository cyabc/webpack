'use strict'
// Template version: {{ template_version }}
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const ROOT = path.resolve(__dirname, '..');
const ip = 'localhost';
const qsid = '999' //通达信 999 其他券商查看相应券商列表文档

module.exports = {
  qsid: qsid,
  root: ROOT,
  // 指定编译目录，避免全部编译拖慢编译速度
  sourceDir: 'src/pages/main/',
  templateDir: '.temp',
  entryFilePath: 'main.js',
  //入口文件过滤
  // entryFilter: '**/*.vue',
  entryFilter: 'credit/*.vue',
  // Options for the filter
  // see: https://www.npmjs.com/package/glob#options
  entryFilterOptions: {},
  dev: {
    // Paths
    assetsSubDirectory: '',
    assetsPublicPath: './',
    proxyTable: {},

    // Various Dev Server settings
    host: ip, // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    {{#lint}} // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,
    {{/lint}}

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
