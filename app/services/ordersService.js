app.service('orders', ['$rootScope', '$log', 'helpers', function($rootScope, $log, helpers){
  var id = undefined;
  var list = [];
  var maxQuantity = 20;
  var total = 0;
  var order = {};

  var OrderItem = function(dish) {
    this.id = parseInt(dish.id);
    this.name = dish.name;
    this.price = helpers.normalizeNumber(dish.price);
    this.quantity = 1;
    this.sum = helpers.normalizeNumber(this.price * this.quantity);

    this.getSum = function() {
      return this.sum;
    };
    this.updateSum = function() {
      this.sum = helpers.normalizeNumber(this.price * this.quantity);
      return this.sum;
    };
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
  this.getMaxQuantity = function() {
    return maxQuantity;
  };

  this.addToOrder = function(dish) {
    var index = checkItemInList(dish);

    if (index !== -1 && list[index].quantity >= maxQuantity) return;

    if (index === -1) {
      list.push(new OrderItem(dish));
    } else if (list[index].quantity < maxQuantity) {
      list[index].quantity += 1;
      list[index].updateSum();
    }

    total = helpers.normalizeNumber(total + dish.price);
    $rootScope.$broadcast('orders:updateTotal', total);
  };
  this.removeFromOrder = function(item) {
    var index = checkItemInList(item);
    list.splice(index, 1);

    total = helpers.normalizeNumber(total - item.getSum());
    $rootScope.$broadcast('orders:updateTotal', total);
  };
  this.updateItemQuantity = function(item) {
    total = helpers.normalizeNumber(total - item.getSum() + item.updateSum());
    $rootScope.$broadcast('orders:updateTotal', total);
  };

  this.createOrder = function(name, phone) {

    if (!name || !phone) {
      $log.error('Name and phone are necessary to be set.');
      return;
    }
    if (!list.length) {
      $log.error('There is nothing to order. List is empty.');
      return;
    }

    order.id = id;
    order.name = name;

    if (helpers.getPhonePattern().test(phone)) {
      order.phone = phone;
    } else {
      $log.error('Incorrect phone number.');
      return;
    }

    order.list = list;
    order.total = total;

    return JSON.stringify(order, '', 2);
  };
  this.clearOrder = function() {
    total = 0;
    list = [];
    order = {};
  };
}]);