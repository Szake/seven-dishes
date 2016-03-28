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

app.service('orders', ['$rootScope', '$log', 'helpers', function($rootScope, $log, helpers){
  var id = undefined;
  var list = [];
  var total = 0;

  var OrderItem = function(dish) {
    this.id = parseInt(dish.id);
    this.name = dish.name;
    this.price = dish.price;
    this.quantity = 1;
  };

  var checkItemInList = function(dish) {
    var index = -1;
    list.forEach(function(el, i){
      if (el.id == dish.id) { index = i; };
    });
    return index;
  };

  this.getOrderItems = function() {
    return list;
  };
  this.getOrderTotal = function() {
    return total;
  };

  this.addToOrder = function(dish) {
    var index = checkItemInList(dish);

    if (index === -1) {
      list.push(new OrderItem(dish));
    } else {
      list[index].quantity += 1;
    }
    total = helpers.normalizeNumber(total + dish.price);
    $rootScope.$broadcast('orders:updateTotal', total);
  };

  this.removeFromOrder = function(item) {
    var index = checkItemInList(item);
    list.splice(index, 1);

    total = helpers.normalizeNumber(total - item.price * item.quantity);
    $rootScope.$broadcast('orders:updateTotal', total);
  };

  this.updateItemQuantity = function(item, quantity) {

    total = helpers.normalizeNumber(total + (quantity - item.quantity) * item.price);
    $rootScope.$broadcast('orders:updateTotal', total);

    item.quantity = quantity;
  };

}]);