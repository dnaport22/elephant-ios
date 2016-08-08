angular.module('Myitems', [])

.controller('MyitemsController', function($scope, $http, $ionicActionSheet) {
  $scope.myitems = [];
  $scope.offset = 0;
  $scope.limit = 10;

  $scope.itemOptions = function() {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      destructiveButtonClicked: function() {
        //Do Stuff

        .done(function(item) {
          var index=$scope.myitems.indexOf(item);
          $scope.myitems.splice(index,1);
        })
        return true; //Closes the modal
      }
    });
    $timeout(function() {
      hideSheet();
    }, 9000);
  };


  $scope.loadMore = function() {

    $http({
      url: 'http://maddna.xyz/myitems.php',
      method: 'GET',
      params: {
        code: localStorage.getItem('user_activation'),
        offset: $scope.offset,
        limit: $scope.limit
      }}).success(function(response) {
        console.log(response)
        $scope.myitems = $scope.myitems.concat(response.items)
        $scope.retrieved = response.items.length
        $scope.offset += $scope.retrieved
        $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.check = function() {
    return $scope.retrieved > 0
  }

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });

 });
