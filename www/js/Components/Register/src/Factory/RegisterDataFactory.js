Register.factory('RegisterDataFactory', function (UserResource, RegisterNotifications, UIfactory, $rootScope,  AuthenticationService, $ionicHistory) {
  var executeRegister = function (data) {
    UserResource.register(data)
    .then(function (response) {
      if (response.status === 200 || statusText === 'OK') {
        UIfactory.hideSpinner();
        $rootScope.$emit('$onUserRegisterFinished');
        UIfactory.showAlert('Registration pending approval', RegisterNotifications.COMPLETE_REGISTER);
        $ionicHistory.goBack();
      }
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
