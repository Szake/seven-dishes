app.factory('helpers', [function() {
  var helpers = {};

  helpers.normalizeNumber = function(number) {
    return Math.round(number*100)/100;
  };
  helpers.getPhonePattern = function() {
    return /^(\+[0-9]{1,2})?\(?[0-9]{3,5}\)?[0-9]{5,7}/;
  };

  return helpers;
}]);