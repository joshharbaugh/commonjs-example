'use strict';
/**
 * @module app
 * @desc App component
 */

var modules = [];

function Application(initModules) {
  modules = modules.concat(initModules)
  this.API_URL = '/api'

  window.endpoints = {
    'api': this.API_URL
  }
}

Application.prototype.boot = function() {
  var angular = require('angular'),
      mod = angular.module('applicationName', modules)
      ;

  mod.constant('API_URL', this.API_URL)
  mod.config(require('./config'))

  angular.bootstrap(document, [mod.name], {
    strictDi : true
  })

  return this
}

function buildApplication(cfg) {
  var _ = require('lodash'),
      components = require('./components'),
      config = _.defaults(cfg || {}, {
        env : 'dev'
      })

  // Dependencies for 'app' component
  require('angular-ui-router')

  return components(config).then(function (component) {
    return new Application([
      // Standard ng dependencies
      'ngSanitize',
      'ngAnimate',
      'ngRoute',
      'templates',
      component.name
    ])
  })
}

module.exports = buildApplication
