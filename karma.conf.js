'use strict';
// Karma configuration
// Generated on Sat Dec 17 2016 19:27:17 GMT-0500 (ECT)
var karma_files = require('./karma_files');
var path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/app/hello_word.js',
      'src/app/specs/hl.js',
      'src/app/specs/hello_word_spec.js'
    ],
    preprocessors: {
      'src/app/**/**.js': ['webpack'],
      'src/app/**.js': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      entry: './src/app/specs/hl.js',
      output: {
        path: __dirname,
        filename: 'bundle.js'
      },
      module: {
       loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: { presets: ['es2015'] }
          }
        ]
      }
    },
    webpackMiddleware: {
      stats: 'errors-only'
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
  });
}
