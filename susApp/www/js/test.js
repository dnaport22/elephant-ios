angular.module('test', [])

.controller('testCtrl', function($scope, $localStorage, popAlert, $cacheFactory, $http) {

  var factory = $cacheFactory('myData');
  var cache = factory.get('myData');

  $scope.caching = function() {
    console.log(cache);
      if (cache) {
        $scope.items = cache;
      }
      else {
        $http.get('http://www.maddna.xyz/getitems.php')
          .success(function(data) {
            factory.put('myData', data.items);
            $scope.variable = data.items;
            $scope.items = [];
            $scope.items = $scope.items.concat(data.items);

          }
       );
     }
   }

   $scope.caching()
});
