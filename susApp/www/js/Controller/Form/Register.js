elephant.controller('RegisterController', function($scope, popAlert, $ionicHistory) {
  $scope.isChecked = {
    checkbox: false
  }

  this.NameId = 'set_name';
  this.EmailId = 'set_email';
  this.PassId = 'set_pass';
  this.Pass2Id = 'set_pass2';
  this.name = inputVal.getValue(this.NameId);
  this.email = inputVal.getValue(this.EmailId);
  this.pass = inputVal.getValue(this.PassId);
  this.pass2 = inputVal.getValue(this.Pass2Id);
  this.url = 'http://maddna.xyz/register.php';

  this.processInput = function() {
     var nameMatching = name.match(this.nameMatch);
     if (this._name == ''  || this._email == '' || this._pass == '' || this._pass2 == '' ) {
       popAlert.showAlert('Alert', 'Please fill all the fields');
     }
     else {
       return this.validateEmail();
     }
  }

  this.validateEmail = function() {
    var validate = new Validation(this._email);
    if (validate.emailValidate() == 'formatError') {
      popAlert.showAlert('Alert', 'Please enter valid LSBU email address');
    }
    else if (validate.emailValidate() == 'invalid') {
      popAlert.showAlert('Alert', 'Invalid email');
    }
    else {
      this.validatePassword();
    }
  }

  this.validatePassword = function() {
    if (this._pass != this._pass2){
      popAlert.showAlert('Alert', 'Password does not match');
    }
    else {
      return this.validateTC();
    }
  }

  this.validateTC = function() {
    if (this.isChecked.checkbox == false) {
      popAlert.showAlert('Alert', 'Agree terms and conditions')
    }
    else {
      return this.submit();
    }
  }

  this.submit = function() {
    var dataString = 'name=' + this._name + '&email=' + this._email + '&pass=' + this._pass;
    var request = new Submitform('POST', this._url, dataString, false);
    request.ajaxSubmit(this);
    return false;
  }

  this.submitResponse = function(response) {
    if (response.status == 1) {
      popAlert.showAlert('Registred successfully', 'A validation email has been sent to your LSBU email account, please validate your email to start using your account.');
      this.reloadForm();
    }
    else if(response.status == 0) {
      popAlert.showAlert('Alert', 'Email already registred');
    }
  }

  this.reloadForm = function() {
    inputVal.setValue(this.NameId, '');
    inputVal.setValue(this.EmailId, '');
    inputVal.setValue(this.PassId, '');
    inputVal.setValue(this.Pass2Id, '');
    this.isChecked.checkbox = false;
    return $ionicHistory.goBack();;
  }

})
