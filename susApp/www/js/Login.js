angular.module('Login', [])

.controller('LoginController', function($scope, $stateParams, $location, $window, $ionicHistory, $ionicSideMenuDelegate, $state, $ionicLoading, $timeout, $localStorage) {

  $scope.path = $stateParams.path;
  $scope.EmailId = 'login_email';
  $scope.PassId = 'login_pass';
  $scope._email = '';
  $scope._pass = '';
  $scope._url = 'http://maddna.xyz/login.php';

  $scope.loginUser = function() {
    this._email = inputVal.getValue(this.EmailId);
    this._pass = inputVal.getValue(this.PassId);
    if (this._email == ''  || this._pass == '') {
      alert("Please Fill All Fields",'Alert');
    }
    else {
      return $scope.validateEmail();
    }
  }

  $scope.validateEmail = function() {
    var validate = new Validation(this._email);
    if (validate.emailValidate() == 'formatError') {
      alert('Plase enter valid lsbu email', "Alert");
    }
    else if (validate.emailValidate() == 'invalid') {
      alert("Invalid Email",'Alert');
    }
    else {
      return $scope.submit();
    }
  }

  $scope.submit = function() {
    var dataString = 'email=' + this._email + '&pass=' + this._pass;
    var request = new Submitform('POST', this._url, dataString, false);
    return request.ajaxSubmit(this);
  }

  $scope.submitResponse = function(response) {
    if (response.status == 0) {
      alert("Invalid account","Alert");
    }
    else if(response.status == 1) {
      if(response.user.status == 0) {
        alert("Activate your account","Alert");
      }
      else {
        alert("You can now get or post items","You are now logged in");
        $scope.userStorage(response.user);
      }
    }
  }

  $scope.userStorage = function(data) {
    $localStorage.user_login_id = 1;
    localStorage.setItem('user_username', data.name);
    localStorage.setItem('user_email', data.email);
    localStorage.setItem('user_activation', data.activation);
    return $scope.reloadForm();
  }

  $scope.reloadForm = function() {
    inputVal.setValue($scope.EmailId, '');
    inputVal.setValue($scope.PassId, '');
    return $scope.redirectUser();
  }

  $scope.redirectUser = function() {

    $ionicLoading.show({
      content: 'Logging in',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    if ($scope.path == 'getitem') {
      $timeout(function () {
        $ionicLoading.hide();
        $ionicHistory.goBack();
      }, 1000);
    }
    else if ($scope.path == 'main') {

      $timeout(function () {
        $ionicLoading.hide();
        $state.go('app.main');
        $ionicSideMenuDelegate.toggleLeft();
      }, 1000);

    }
    else if ($scope.path == 'postitem') {

      $timeout(function () {
        $ionicLoading.hide();
        $state.go('app.postitem');
      }, 1000);
    }
  }
});
