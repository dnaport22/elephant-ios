PasswordReset.controller('RequestResetPasswordController', function($scope, UIfactory, UserFactory, UserResource, DrupalHelperService, AuthenticationService, $http, $ionicHistory, $firebaseAuth) {
  var ResetFactory = new UserFactory();
  var resetPass = '';
  const BASE_URL = 'http://developv2.myelephant.xyz/';

  $scope.doResetRequest = function () {
    readyToRequest();
  };

  var readyToRequest = function () {
   resetPass = inputVal.getValue('reset_email');
   if (validateField()) {
     if (checkEmail()) {
       finaliseResetRequest()
     }
   }
  };

  var validateField = function () {
    if (resetPass === " ") {
      UIfactory.showAlert('Alert', 'Enter your email!');
      return false;
    } else {
      return true;
    }
  };

  var checkEmail = function () {
    return ResetFactory.validateEmail(resetPass);
  };

  var finaliseResetRequest = function () {
    var auth = $firebaseAuth();
    auth.$sendPasswordResetEmail(resetPass)
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
    inputVal.setValue('reset_email', '');
  };

});