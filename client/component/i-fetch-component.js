'use strict';

$ = require('jQuery')

var xhrSetup = {}

function getAPI() {
  return $.ajax(window.endpoints.api, xhrSetup)
}

function getUser(api) {
  return $.ajax(api.urls.user_url, xhrSetup)
}

function isAdmin(user) {
  return $.ajax(user.self, xhrSetup).then(function(user) {
    return !!user.body.admin
  })
}

module.exports = function iFetchComponent(cfg) {
  var deferred = $.Deferred()
      ;

  cfg = cfg || {}

  getAPI().then(function (api) {
            return getUser(api).then(function (user) {
                return true
            })
          })
          .then(function () {
            deferred.resolve(true)
          }, function () {
            deferred.resolve(false)
          })

  return deferred.promise()
}