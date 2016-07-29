angular.module('Getitems', ['susapp.config'])

.controller('MainpageCtrl', function($scope, $http) {

  $scope.items = [];
  $scope.offset = 0;
  $scope.limit = 10;


  $scope.loadMore = function() {
    $http({
      url: 'http://maddna.xyz/getitems.php',
      method: 'GET',
      params: {
        offset: $scope.offset,
        limit: $scope.limit,
        filter: document.getElementById('search').value
      }}).success(function(response) {
      var x = response.items
      $scope.items = $scope.items.concat(response.items)
      $scope.retrieved = response.items.length
      $scope.offset += $scope.retrieved
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.search = function(filter) {
    $scope.items = [];
    $scope.offset = 0
    $scope.loadMore()
  }

  $scope.check = function() {
    return $scope.retrieved > 0
  }

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });

 });
