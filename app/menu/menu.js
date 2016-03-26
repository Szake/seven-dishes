'use strict';

angular.module('dishesApp.menu', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/menu', {
    templateUrl: 'menu/menu.html',
    controller: 'menuCtrl'
  });
}])

.controller('menuCtrl', ['$scope', 'dishes', function($scope, dishes) {

  dishes.getDishes().then(
      function(response) {
        var dishes = response.data;

        // Get unique categories from the Dishes
        $scope.cats = dishes
          .map(function(dish){
            return dish.category;
          })
          .filter(function(value, index, self) {
            return self.indexOf(value) === index;
          });

        $scope.dishes = dishes;
      },
      function(){
        console.log('Failed to download dishes.');
      }
  );

  // todo: to be continued...
  $scope.addToOrder = function(dish) {
    console.log('Adding to Order...');
    console.log(dish);
  };

}])

.factory('dishes', ['$http', '$q', function($http, $q) {
  var service = {};
  var dishesUrl = 'json/dishes.json';
  var deferred = $q.defer();

  service.getDishes = function() {

    $http.get(dishesUrl).then(
      function(response) {
        deferred.resolve(response);
      },
      function() {
        deferred.reject('The error occurred.');
      }
    );

    return deferred.promise;
  };

  return service;
}])

.filter('filterByCategory', function() {
  return function(dishes, category) {
    return dishes.filter(function(dish) {
      return dish.category == category;
    });
  };
});