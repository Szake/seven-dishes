app.factory('helpers', [function() {
  var helpers = {};

  helpers.normalizeNumber = function(number) {
    return Math.round(number*100)/100;
  };

  return helpers;
}]);