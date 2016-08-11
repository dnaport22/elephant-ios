angular.module('test', [])

.controller('testCtrl', function($scope, $localStorage, popAlert) {
  $scope.$storage = $localStorage.$default({
    expiry: null
  })
  console.log($localStorage.expiry)

  $scope.expiry = function() {
    return $localStorage.expiry = new Date().getTime();
  }

  $scope.expiry()
});
