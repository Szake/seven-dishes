app.controller('menuCtrl', ['$scope', '$log', 'dishes', 'orders', 'helpers', function($scope, $log, dishesFactory, orders, helpers) {

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
      $scope.dishesErrors = 'There are no dishes.';
    }
  );

  $scope.orderList = orders.getOrderItems();
  $scope.orderTotal = orders.getOrderTotal();
  $scope.orderPhonePattern = helpers.getPhonePattern();
  $scope.orderItemMaxQuantity = orders.getMaxQuantity();

  $scope.addToOrder = function(dish) {
    orders.addToOrder(dish);
  };
  $scope.removeFromOrder = function(item){
    orders.removeFromOrder(item);
  };

  $scope.submitOrder = function() {
    $log.info('Submitting form...');
    $log.info(orders.createOrder($scope.orderName, $scope.orderPhone));
  };

  $scope.updateItemQuantity = function(item) {
    orders.updateItemQuantity(item);
  };

  $scope.$on('orders:updateTotal', function(event, newTotal) {
    $scope.orderTotal = newTotal;
  });

}]);