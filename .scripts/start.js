'use strict'

var path = require('path')
var budo = require('budo')
var babelify = require('babelify')
var envify = require('envify/custom')
var babelConfig = require('../config/babel');
// var hotModuleReload = require('browserify-hmr')

require('dotenv').config({silent: true})

budo(path.join('example', 'index.js'), {
  serve: 'bundle.js',
  dir: 'public',
  live: true,
  port: 8000,
  stream: process.stdout,
  browserify: {
    // plugin: hotModuleReload,
    debug: true,
    insertGlobals: true,
    transform: [
      babelify.configure(babelConfig),
      envify(Object.assign({}, process.env, {
        _: 'purge',
        NODE_ENV: 'development'
      }))
    ]
  }
})
