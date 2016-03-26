'use strict';

// Declare app level module which depends on views, and components
angular.module('dishesApp', [
  'ngRoute',
  'dishesApp.menu'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/menu'});
}]);
