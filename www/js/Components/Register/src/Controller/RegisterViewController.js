Register.controller('RegisterViewController', function($scope, UserFactory, UserResource, UIfactory, RegisterDataFactory, DrupalHelperService, $rootScope) {

  var RegisterFactory = new UserFactory;
  $scope.registerData = {isChecked: false};

  $rootScope.$on('$onUserRegisterFinished', function () {
    reloadForm();
  });

  $scope.doRegister = function () {
    readyToRegister();
  };

  var readyToRegister = function () {
    if (prepareData()) {
      runValidation();
    }
  };

  var runValidation = function () {
    if (validateField()) {
      if (checkEmail()) {
        if (matchPass()) {
          if (checkTC()) {
            RegisterDataFactory.finaliseRegister();
          }
        }
      }
    }
  };

  var validateField = function () {
    for (var value in RegisterDataFactory.newUserData) {
      if (RegisterDataFactory.newUserData[value] == "") {
        UIfactory.showAlert('Alert', 'Fill all the fields');
        return false;
      }
    }
    return true;
  };

  var checkEmail = function () {
    return RegisterFactory.validateEmail(inputVal.getValue('mail'));
  };

  var matchPass = function () {
    if (inputVal.getValue('pass1') !== inputVal.getValue('pass2')) {
      UIfactory.showAlert('Alert', 'Password not matching');
      return false;
    } else {
      return true;
    }
  };

  var checkTC = function () {
    if ($scope.registerData.isChecked) {
      return true;
    } else {
      UIfactory.showAlert('Alert', 'Agree terms and conditions or I WILL HUNT YOU DOWN!');
      return false;
    }
  };

  var prepareData = function () {
    try {
      RegisterDataFactory.newUserData.name = inputVal.getValue('name');
      RegisterDataFactory.newUserData.mail = inputVal.getValue('mail');
      RegisterDataFactory.newUserData.pass = inputVal.getValue('pass1');
      return true;
    } catch (err) {
      return false;
    }
  };

  var reloadForm = function () {
    inputVal.setValue('name', '');
    inputVal.setValue('mail', '');
    inputVal.setValue('pass1', '');
    inputVal.setValue('pass2', '');
    $scope.registerData.isChecked = false;
  };

});