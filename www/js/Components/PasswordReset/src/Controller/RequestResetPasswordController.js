PasswordReset.controller('RequestResetPasswordController', function($scope, UIfactory, UserFactory, UserResource, DrupalHelperService, AuthenticationService, $http, $ionicHistory) {
  $scope.resetPass = {name: null};
  var ResetFactory = new UserFactory();

  $scope.doResetRequest = function () {
    readyToRequest();
  };

  var readyToRequest = function () {
   if (validateField()) {
     if (checkEmail()) {
       finaliseResetRequest()
     }
   }
  };

  var validateField = function () {
    if ($scope.resetPass.name === null) {
      UIfactory.showAlert('Alert', 'Enter your email!');
      return false;
    } else {
      return true;
    }
  };

  var checkEmail = function () {
    return ResetFactory.validateEmail($scope.resetPass.name);
  };

  var finaliseResetRequest = function () {
    $http({
      url: BASE_URL + '?q=api/user/request_new_password',
      method: "POST",
      data: $scope.resetPass
    })
    .then(function(response) {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Success', 'Check your email!');
      resetForm();
      $ionicHistory.goBack();
    }, function(err) {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', 'Error occurred while requesting new password!');
    });
  };

  var resetForm = function () {
    $scope.resetPass.name = null;
  };

});