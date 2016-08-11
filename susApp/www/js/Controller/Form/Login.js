elephant.controller('LoginController', function($scope, $stateParams, $location, $ionicHistory, $ionicSideMenuDelegate, $state, $timeout, $localStorage, UIfactory) {

  var path = $stateParams.path;
  var loginMessage = 'Log in in to ';
  var EmailId = 'login_email';
  var PassId = 'login_pass';
  var email = '';
  var pass = '';
  var url = 'http://maddna.xyz/login.php';

  $scope.loginUser = function() {
    console.log('triggered')
    this.email = inputVal.getValue(this.EmailId);
    this.pass = inputVal.getValue(this.PassId);
    if (this.email == ''  || this.pass == '') {
      UIfactory.showAlert('Alert', 'Please fill all the fields');
    }
    else {
      return this.validateEmail();
    }
  }

  this.validateEmail = function() {
    var validate = new Validation(this.email);
    if (validate.emailValidate() == 'formatError') {
      UIfactory.showAlert('Alert', 'Plase enter valid lsbu email');
    }
    else if (validate.emailValidate() == 'invalid') {
      UIfactory.showAlert('Alert', 'Invalid Password');
    }
    else {
      return this.submit();
    }
  }

  this.submit = function() {
    var dataString = 'email=' + this._email + '&pass=' + this._pass;
    var request = new Submitform('POST', this._url, dataString, false);
    return request.ajaxSubmit(this);
  }

  this.submitResponse = function(response) {
    if (response.status == 0) {
      UIfactory.showAlert('Alert', 'Invalid account');
    }
    else if(response.status == 1) {
      if(response.user.status == 0) {
        UIfactory.showAlert('Alert', 'Please activate your account');
      }
      else {
        this.userStorage(response.user);
      }
    }
  }

  this.userStorage = function(data) {
    $localStorage.user_login_id = 1;
    $localStorage.user_username = data.name;
    $localStorage.user_email = data.email;
    $localStorage.user_activation = data.activation;
    $localStorage.expiry = new Date().getTime();
    return this.reloadForm();
  }

  this.reloadForm = function() {
    inputVal.setValue($scope.EmailId, '');
    inputVal.setValue($scope.PassId, '');
    return this.redirectUser();
  }

  this.redirectUser = function() {
    UIfactory.showSpinner();
    if (path == 'getitem') {
      $timeout(function () {
        UIfactory.hideSpinner();
        $ionicHistory.goBack();
      }, 1000);
    }
    else if (path == 'main') {

      $timeout(function () {
        UIfactory.hideSpinner();
        $state.go('app.main');
        $ionicSideMenuDelegate.toggleLeft();
      }, 1000);

    }
    else if (path == 'postitem') {

      $timeout(function () {
        UIfactory.hideSpinner();
        $ionicHistory.goBack();
      }, 1000);
    }
  }

  //Login intent message
  if (path == 'main') {
    $scope.loginMessage = 'Log in to get or post items';
  }
  else if(path == 'postitem') {
    $scope.loginMessage = 'Log in to post items';
  }
  else if (path == 'getitem') {
    $scope.loginMessage = 'Log in to send message';
  }
});
