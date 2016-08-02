angular.module('Viewitem', [])

.controller('ViewitemController', function($scope, $stateParams, $location) {
  $scope.item_name = $stateParams.itemName;
  $scope.item_description = $stateParams.itemDesc;
  $scope.item_date = $stateParams.itemDate;
  $scope.item_uid = $stateParams.itemUid;
  $scope.item_img = $stateParams.itemImg;

  $scope.messageCheck = function() {
    if (localStorage.getItem('user_status') == 1) {
      var itemRequest = new Message($scope.item_uid, $scope.item_name);
      itemRequest.processInput();
    }
    else {
      $location.path("/app/login")
    }

  }
});
