angular.module('Getitems', [])

.controller('MainpageCtrl', function($scope, $http, $location, $ionicLoading, $timeout, $state) {

  $scope.items = [];
  var offset = 0;
  var limit = 10;

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $scope.loadMore = function() {
    $http({
      url: 'http://maddna.xyz/getitems.php',
      method: 'GET',
      params: {
        offset: offset,
        limit: limit,
        filter: document.getElementById('search').value
      }}).success(function(response) {
        $scope.items = $scope.items.concat(response.items)
        $scope.retrieved = response.items.length
        offset += $scope.retrieved
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $ionicLoading.hide();
    });
  };

  $scope.search = function(filter) {
    $scope.items = [];
    offset = 0
    $scope.loadMore();
  }

  $scope.check = function() {
    return $scope.retrieved > 0
  }

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });

  $scope.trafficLight = function(route, item_name, item_desc, item_date, item_uid, item_img) {
    if (route == 'postitem') {
      if (localStorage.getItem('user_status') == 1) {
        $location.path("/app/postitem")
      }
      else {
        $location.path("/app/login")
      }
    }
    else if (route == 'getitem') {
      $location.path("/app/getitem/" + item_name + "/" + item_desc + "/" + item_date + "/" + item_uid + "/" + item_img )
    }
  }

  $scope.reloadData = function() {
    $state.go($state.current, {reload: true, inherit: false})
    $scope.$broadcast('scroll.refreshComplete');
  }

 });
