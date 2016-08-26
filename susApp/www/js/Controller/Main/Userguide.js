elephant.controller('UserguideController', function($ionicHistory, $ionicModal, $scope, $ionicSlideBoxDelegate, $localStorage, $state, UIfactory) {
  /**
   * Hides any ongoing spinners
   */
  UIfactory.hideSpinner();

  /**
   * Init localStorage app_launch_activity objectß
   */
  $scope.$storage = $localStorage.$default({
    app_launch_activity: 0
  });
  /**
   * Return back to home back
   */
  $scope.closeUserGuide = function() {
    $localStorage.app_launch_activity = 1
    $ionicHistory.goBack();
  }

})
