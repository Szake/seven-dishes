app.controller('menuCtrl', ['$rootScope', '$scope', '$log', 'dishes', 'orders', function($rootScope, $scope, $log, dishesFactory, orders) {

  dishesFactory.getDishes().then(
    function(response) {

      $scope.dishes = dishesFactory.buildDishes(response.data);

      // Get unique categories from the Dishes
      $scope.categories = $scope.dishes
        .map(function(dish){
          return dish.category;
        })
        .filter(function(value, index, self) {
          return self.indexOf(value) === index;
        });

    },
    function(){
      $log.error('Failed to download dishes.');
    }
  );

  $scope.order = orders.getOrderItems();
  $scope.orderTotal = orders.getOrderTotal();

  $scope.addToOrder = function(dish) {
    orders.addToOrder(dish);
  };
  $scope.removeFromOrder = function(item){
    orders.removeFromOrder(item);
  };

  $scope.updateItemQuantity = function(item, quantity) {
    orders.updateItemQuantity(item, quantity);
  };

  $scope.$on('orders:updateTotal', function(event, newTotal) {
    $scope.orderTotal = newTotal;
  });

}]);