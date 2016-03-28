app.filter('filterDishesByCategory', function() {
  return function(dishes, category) {
    return dishes.filter(function(dish) {
      return dish.category == category;
    });
  };
});
