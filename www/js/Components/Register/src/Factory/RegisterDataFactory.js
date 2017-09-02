Register.factory('RegisterDataFactory', function (UserResource, RegisterNotifications, UIfactory, $rootScope,  AuthenticationService, $ionicHistory, $firebaseAuth) {
  var executeRegister = function (data) {
    var auth = $firebaseAuth();
    auth.$createUserWithEmailAndPassword(data['mail'], data['pass'])
    .then(function (firebaseUser) {
      UIfactory.hideSpinner();
      firebaseUser.sendEmailVerification();
      $rootScope.$emit('$onUserRegisterFinished');
      UIfactory.showAlert('Registration pending approval', RegisterNotifications.COMPLETE_REGISTER);
      $ionicHistory.goBack();
    }, function (error) {
      var statusMessage = error.message;
      switch (statusMessage) {
        case "The email address is already in use by another account.":
					UIfactory.hideSpinner();
					UIfactory.showAlert('Ooops !', RegisterNotifications.DUPLICATE_ACCOUNT);
					break;
        default:
					UIfactory.hideSpinner();
					UIfactory.showAlert('Ooops !', RegisterNotifications.ERROR);
      }

    })
  };

  return {
    newUserData: {
      mail: null,
      pass: null
    },
    finaliseRegister: function () {
      that = this;
      AuthenticationService.refreshConnection()
      .then(function (res) {
        executeRegister(that.newUserData);
      })
    }
  }
});
