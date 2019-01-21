'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')



exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, '')
    })
  }
}

const isWin = /^win/.test(process.platform);

// Wraping the entry file for web.
const getWebEntryFileContent = (entryPath, vueFilePath) => {
  let relativeVuePath = path.relative(path.join(entryPath, '../'), vueFilePath);
  let relativeEntryPath = path.join(config.root,'src',config.entryFilePath);
  let contents = '';
  let entryContents = fs.readFileSync(relativeEntryPath).toString();
  if (isWin) {
      relativeVuePath = relativeVuePath.replace(/\\/g, '\\\\');
  }

    contents += `
import App from '${relativeVuePath}';
`;
// new Vue(Vue.util.extend({el: '#root'}, App));
 
  return contents+entryContents;
}


const fs = require('fs-extra');
const vueWebTemp =  path.join(config.root, config.templateDir);
// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件

const glob = require('glob');

//页面模板
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹

// const PAGE_PATH = path.resolve(__dirname, '../src/pages/main')

const entryFiles = glob.sync(`${config.sourceDir}/${config.entryFilter}`, config.entryFilterOptions);

//用于做相应的merge处理
const merge = require('webpack-merge');

//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理

exports.entries = function() {
  // body...
  // let entryFiles = glob.sync(PAGE_PATH + '/*/*.js');


  let map = {};
  entryFiles.forEach((filePath) => {

    const extname = path.extname(filePath);
    let basename = filePath.replace(`${config.sourceDir}/`, '').replace(extname, '');
    let templatePathForWeb = path.join(vueWebTemp, basename + '.web.js');
    fs.outputFileSync(templatePathForWeb, getWebEntryFileContent(templatePathForWeb, filePath));
    map[basename] = templatePathForWeb;



  });
  return map;
}

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中

exports.htmlPlugin = function() {
  // body...
  // let entryHtml = glob.sync(PAGE_PATH + '/*/*.html');
  let entryHtml =entryFiles;
  let arr = [];
  entryHtml.forEach((filePath) => {
    let extname = path.extname(filePath);
    let basename = filePath.replace(`${config.sourceDir}/`, '').replace(extname, '');

    let conf = {
      //模板来源
      template: config.root+'/index.html',
      filename: basename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['manifest', 'vendor', basename],
      inject: true
    }

    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhtiespace: true,
          removeAttributeQuotes: true

        },
        chunksSortMode: 'dependency'
      })
    }

    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}
