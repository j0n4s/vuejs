'use strict';
// Karma configuration
// Generated on Sat Dec 17 2016 19:27:17 GMT-0500 (ECT)

var path = require('path');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var utils = require('./utils');
var webpack = require('webpack');
var projectRoot = path.resolve(__dirname, '');

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: { loaders: utils.styleLoaders() },
  devtool: '#inline-source-map',
  vue: { loaders: { js: 'isparta' } },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('./config/test.env')
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

// make sure isparta loader is applied before eslint
webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || []
webpackConfig.module.preLoaders.unshift({
  test: /\.js$/,
  loader: 'isparta',
  include: path.resolve(projectRoot, 'src')
})

// only apply babel for test files when using isparta
webpackConfig.module.loaders.some(function (loader, i) {
  if (loader.loader === 'babel') {
    loader.include = path.resolve(projectRoot, 'test/unit')
    return true
  }
});

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [ 'src/app/specs/**.js', './index.js' ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    exclude: [ ],  
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}
