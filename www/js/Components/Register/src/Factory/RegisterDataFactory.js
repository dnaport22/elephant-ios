Register.factory('RegisterDataFactory', function (UserResource, RegisterNotifications, UIfactory, $rootScope,  AuthenticationService, $ionicHistory, $firebaseAuth) {
  var executeRegister = function (data) {
    var auth = $firebaseAuth();
    auth.$createUserWithEmailAndPassword(data['mail'], data['pass'])
    .then(function (firebaseUser) {
      UIfactory.hideSpinner()
      console.log(firebaseUser);
      firebaseUser.sendEmailVerification();
      $rootScope.$emit('$onUserRegisterFinished');
      UIfactory.showAlert('Registration pending approval', RegisterNotifications.COMPLETE_REGISTER);
      $ionicHistory.goBack();
    }, function (error) {
      console.log(error.statusText);
      UIfactory.hideSpinner();
      UIfactory.showAlert('Ooops !', RegisterNotifications.ERROR);
    })
  };

  return {
    newUserData: {
      name: null,
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
