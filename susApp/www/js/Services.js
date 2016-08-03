angular.module('Services', [])

.factory('FetchitemsService', function($http) {
  var BASE_URL = "http://maddna.xyz/getitems.php";
  var items = [];
  var offset = 0;
  var limit = 10;

  return {
    GetItems: function() {
      return $http({
        url: BASE_URL,
        method: 'GET',
        params: {
          offset: offset,
          limit: limit,
          filter: document.getElementById('search').value
        }
      }).then(function(response) {
          items = response.data.items;
          console.log(offset)
          return items;
        });
    }
  }
});
