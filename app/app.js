'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('dishesApp', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'menuCtrl'
      })
      .otherwise({redirectTo: '/menu'});
  }]);