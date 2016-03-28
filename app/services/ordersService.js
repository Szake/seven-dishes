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