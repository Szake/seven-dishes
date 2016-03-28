app.factory('dishes', ['$http', '$q',  function($http, $q ) {
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

  //this is private, use `buildDish` or `buildDishes` instead
  var Dish = function(id, name, description, image_url, weight, category, price) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image_url = image_url;
    this.weight = weight;
    this.category = category;
    this.price = parseFloat(price);
  };

  service.buildDish = function(dishJson) {
    return new Dish(
      dishJson.id,
      dishJson.name,
      dishJson.description,
      dishJson.image_url,
      dishJson.weight,
      dishJson.category,
      dishJson.price
    )
  };

  service.buildDishes = function(dishesJsonArray) {
    return dishesJsonArray.map(function(dishJson) {
      return service.buildDish(dishJson)
    });
  };

  return service;
}]);