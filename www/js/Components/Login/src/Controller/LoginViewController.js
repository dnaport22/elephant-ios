Login.controller('LoginViewController', function($stateParams, $scope, $ionicSideMenuDelegate, UIfactory, AuthenticationService, $state, $ionicHistory, $rootScope, CurrentUserfactory, $firebaseAuth) {
  UIfactory.hideSpinner();
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
    if ($scope.loginData.username !== null || $scope.loginData.password !== null) {
      return true;
    }
    UIfactory.hideSpinner();
    UIfactory.showAlert('Alert', 'Fill all fields.');
    return false;
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
    auth.$signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password)
    .then(function (response) {
      if (response.emailVerified) {
        $rootScope.$emit('$onLoginFinished', response);
      } else {
        UIfactory.hideSpinner();
        UIfactory.showAlert('Alert', 'Account not verified.')
      }
    }, function (error) {
      UIfactory.hideSpinner();
      var statusText = error.message || "Error while log in";
      UIfactory.showAlert('Alert', statusText);
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
      $ionicHistory.goBack();
    }
  };

  //Login intent message
  if (path == 'main') {
    $scope.loginMessage = 'Log in to get or post items.';
  }
  else if(path == 'postitem') {
    $scope.loginMessage = 'Log in to post items.';
  }
  else if (path == 'getitem') {
    $scope.loginMessage = 'Log in to send a message.';
  }

});
