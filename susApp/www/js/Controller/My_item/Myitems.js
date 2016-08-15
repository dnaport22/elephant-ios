elephant.controller('MyitemsController', function($scope, $http, $timeout, $localStorage, $ionicActionSheet, elephantData_URL, UIfactory, $templateCache) {
  $scope.myitems = [];
  var offset = 0;
  var limit = 10;
  var retrieved = 0;

  $scope.itemOptions = function(itemid, item) {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        {text: 'Delete'},
      ],
      buttonClicked: function(index) {
        if (index == 0) {
          var dataString = {
            code: $localStorage.user_activation,
            name: itemid
          }
          $.ajax({
            type: elephantData_URL.DELETE_USER_ITEM_TYPE,
            url: elephantData_URL.DELETE_USER_ITEM_URL,
            data: dataString,
            success:function(response) {
              hideSheet();
              var index = $scope.myitems.indexOf(item);
              $scope.myitems.splice(index, 1);
            },
            error: function(error) {
              UIfactory.showAlert('Error occured', 'An error occured while deleting your item')
            }
          })
        }
      }
    });
    $timeout(function() {
      hideSheet();
    }, 9000);
  };

  $scope.loadMore = function() {
    $http({ url: elephantData_URL.GET_USER_ITEM_URL, method: elephantData_URL.GET_USER_ITEM_TYPE, cache: $templateCache,
      params: {
        code: $localStorage.user_activation,
        offset: offset,
        limit: limit
      }}).success(function(response) {
        $scope.myitems = $scope.myitems.concat(response.items)
        retrieved = response.items.length
        offset += retrieved
        $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.check = function() {
    return retrieved > 0
  }

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });
 });
