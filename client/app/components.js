'use strict';

var iFetchComponent = require('../component/i-fetch-component')

modules.exports = function(cfg) {
  var angular = require('angular'),
      _ = require('lodash')
      ;

  return iFetchComponent({}).then(function (enabled) {
    var deps = [
      require('../authentication'),
      require('../logging'),
      require('../app-monitor')
    ]
    .map(function (component) {
      return component.name
    })

    return angular.module('components', deps)
  })
}
