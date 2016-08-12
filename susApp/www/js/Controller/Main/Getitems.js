elephant.controller('MainpageCtrl', function($scope, $http, $location, $timeout, $state, $localStorage, UIfactory, elephantData_URL, $templateCache) {

  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.loadMore();
  });

  UIfactory.showSpinner();

  $scope.$storage = $localStorage.$default({
    user_login_id: 0,
    user_username: null,
    user_activation: null,
    user_email: null,
    expiry: 0
  });

  $scope.items = [];
  var offset = 0;
  var limit = 10;
  var retrieved = 0;

  $scope.loadMore = function() {
    $http({ url: elephantData_URL.GET_ALL_ITEM_URL, method: elephantData_URL.GET_ALL_ITEM_TYPE, cache: $templateCache,
      params: {
        offset: offset,
        limit: limit,
        filter: inputVal.getValue('search'),
      }}).success(function(response) {
        $scope.items = $scope.items.concat(response.items)
        retrieved = response.items.length
        offset += retrieved
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        UIfactory.hideSpinner();
    }).error(function(error) {
      $scope.loadMore();
    });
  };

  $scope.search = function(filter) {
    $scope.items = [];
    offset = 0
    $scope.loadMore();
  }

  $scope.pullToRefresh = function() {
    $scope.items = [];
    offset = 0
    $scope.loadMore();
  }

  $scope.check = function() {
    return retrieved > 0
  }


  $scope.trafficLight = function(route, item_name, item_desc, item_date, item_uid, item_img) {
    if (route == 'getitem') {
      $location.path("/app/getitem/" + item_name + "/" + item_desc + "/" + item_date + "/" + item_uid + "/" + item_img )
    }
  }

  $scope.reloadData = function() {
    $state.go($state.current, {reload: true, inherit: false})
    $scope.$broadcast('scroll.refreshComplete');
  }

 });
