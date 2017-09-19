Login.controller('LoginViewController', function($stateParams, $scope, $ionicSideMenuDelegate, UIfactory, AuthenticationService, $state, $ionicHistory, $rootScope, CurrentUserfactory, $firebaseAuth, UserFactory) {
  UIfactory.hideSpinner();
	var LoginFactory = new UserFactory;
  $scope.loginData = {username: null, password: null};
  $scope.loginMessage = null;

  var path = $stateParams.path;

  $scope.doLogin = function () {
    readyToLogin();
  };

  var readyToLogin = function () {
    if (validateField()) {
      loginFinalise();
    }
  };

  var validateField = function () {
    if ($scope.loginData.username === null || $scope.loginData.password === null) {
			UIfactory.hideSpinner();
			UIfactory.showAlert('Alert', 'Please complete all fields.');
			return false;

    } else {
			return LoginFactory.validateEmail($scope.loginData.username);
    }
  };

  var clearFields = function () {
    $scope.loginData.username = null;
    $scope.loginData.password = null;
  };

  var loginFinalise = function () {
    AuthenticationService.refreshConnection()
      .then(function (res) {
        executeLogin();
      })
  };

  var executeLogin = function () {
    var auth = $firebaseAuth();
    UIfactory.showSpinner();
    auth.$signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password)
    .then(function (response) {
      if (response.emailVerified) {
        $rootScope.$emit('$onLoginFinished', response);
      } else {
        UIfactory.hideSpinner();
				UIfactory.resendVerificationMail()
      }
    }, function (error) {
      var statusText = error.message || "Error while log in";
      switch (statusText) {
        case "The password is invalid or the user does not have a password.":
					UIfactory.hideSpinner();
					UIfactory.showAlert('Alert', "Incorrect password");
					break;
        case "There is no user record corresponding to this identifier. The user may have been deleted.":
					UIfactory.hideSpinner();
					UIfactory.noAccountAlert();
      }
    });
  };

  $rootScope.$on('$onLoginFinished', function (event, response) {
    UIfactory.hideSpinner();
    clearFields();
    CurrentUserfactory.setAuthenticated();
    CurrentUserfactory.setEmail(response.email);
    redirectUser()
  });

  var redirectUser = function() {
    UIfactory.showSpinner();
    if (path == 'getitem') {
      UIfactory.hideSpinner();
      $ionicHistory.goBack();
    }
    else if (path == 'main') {
      UIfactory.hideSpinner();
      $state.go('app.main');
      $ionicSideMenuDelegate.toggleLeft();
    }
    else if (path == 'postitem') {
      UIfactory.hideSpinner();
			$state.go('app.main');
    }
  };

  //Login intent message
  if (path == 'main') {
    $scope.loginMessage = 'Log in to get or post items';
  }
  else if(path == 'postitem') {
    $scope.loginMessage = 'Log in to post items';
  }
  else if (path == 'getitem') {
    $scope.loginMessage = 'Log in to send a message';
  }

});
