'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

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
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

// glob��webpack��װʱ������һ��������ģ�飬��ģ��������ʹ�� *�ȷ���, ����lib/*.js���ǻ�ȡlib�ļ����µ�����js��׺�����ļ�

const glob = require('glob');

//ҳ��ģ��
const HtmlWebpackPlugin = require('html-webpack-plugin');

// ȡ����Ӧ��ҳ��·������Ϊ֮ǰ�����ã�������src�ļ����µ�pages�ļ���

const PAGE_PATH = path.resolve(__dirname, '../src/pages')
//��������Ӧ��merge����
const merge = require('webpack-merge');

//���������
// ͨ��globģ���ȡpages�ļ����µ����ж�Ӧ�ļ����µ�js��׺�ļ���������ļ�����
// ��ô����Ϊ��ڴ���

exports.entries = function() {
  // body...
  let entryFiles = glob.sync(PAGE_PATH + '/*/*.js');


  let map = {};
  entryFiles.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    let pathArr = filePath.split('\/');
    // let currentpath = pathArr[pathArr.length-2];
    map[filename] = filePath;
  });
  return map;
}

//��ҳ���������
// ������Ķ�ҳ�����������ͬ����ȡpages�ļ����µĶ�Ӧ��html��׺�ļ���Ȼ�����������

exports.htmlPlugin = function() {
  // body...
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html');
  let arr = [];
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    let pathArr = filePath.split('\/');
    let currentpath = pathArr[pathArr.length - 2];
    // filename = currentpath+'.'+ filename;
    let conf = {
      //ģ����Դ
      template: filePath,
      filename: filename + '.html',
      // ҳ��ģ����Ҫ�Ӷ�Ӧ��js�ű����������������ÿ��ҳ�涼���������е�js�ű�
      chunks: ['manifest', 'vendor', filename],
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
