elephant.controller('RequestResetController', function($scope, UIfactory, UserFactory, elephantData_URL, elephantData_RESETPASS, RequestRegisterNotification) {

  const BASE_URL = elephantData_URL.RESET_REQUEST_URL;
  var EmailId = elephantData_RESETPASS.RESET_REQUEST;

  $scope.requestReset = function() {
    UIfactory.showSpinner();
    var requestReset_data = {
      email: inputVal.getValue(EmailId)
    }
    var reset = new UserFactory;
    reset.requestResetCredentials(requestReset_data.email);
    var cleanEmail = reset.cleanEmail();
    if(reset.validateEmail(cleanEmail) == true) {
      var resetFormSubmit = new Submitform('POST', BASE_URL, reset.requestResetFormData(), false);
      resetFormSubmit.ajaxSubmit(this);
    }
  }

  $scope.onSuccess = function(response) {
    if (response.status == 0) {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert',RequestRegisterNotification.RESET_ERROR);
    }
    else if(response.status == 1) {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Success', RequestRegisterNotification.RESET_SUCCESS)
    }
    else {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', RequestRegisterNotification.RESET_ERROR)
    }
    return reloadForm();
  }

  $scope.onError = function (response) {
    UIfactory.hideSpinner();
    UIfactory.showAlert('Alert', RequestRegisterNotification.RESET_ERROR)
  }

  var reloadForm = function() {
    inputVal.setValue(EmailId, '');
  }

})
