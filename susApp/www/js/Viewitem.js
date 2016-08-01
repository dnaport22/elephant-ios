angular.module('Viewitem', [])

.controller('ViewitemController', function($scope, $stateParams) {
  $scope.item_name = $stateParams.itemName;
  $scope.item_description = $stateParams.itemDesc;
  $scope.item_date = $stateParams.itemDate;
  $scope.img_dir = $stateParams.imgDir;
  $scope.img_link = $stateParams.imgLink;
});
