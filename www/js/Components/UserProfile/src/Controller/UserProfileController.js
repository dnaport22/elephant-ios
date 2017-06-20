praf.controller('UserProfileController', function($scope, CurrentUserfactory) {
  $scope.userData = CurrentUserfactory.getCurrentUserObject();
});