angular.module('Register', [])

.controller('RegisterController', function($scope) {
  $scope.isChecked = {
    checkbox: false
  }

  $scope.register = function() {
    registerUser.processInput($scope.isChecked.checkbox)
  }
})
// Class to register users
function Register() {
  this.NameId = 'set_name';
  this.EmailId = 'set_email';
  this.PassId = 'set_pass';
  this.Pass2Id = 'set_pass2';
  this._name = '';
  this._email = '';
  this._pass = '';
  this._pass2 = '';
  this.checkbox = null;
  this._url = 'http://maddna.xyz/register.php';
}

Register.prototype.processInput = function(checkbox) {
   this.checkbox = checkbox;
   this._name = inputVal.getValue(this.NameId);
   this._email = inputVal.getValue(this.EmailId);
   this._pass = inputVal.getValue(this.PassId);
   this._pass2 = inputVal.getValue(this.Pass2Id);
   var nameMatching = name.match(this.nameMatch);
   if (this._name == ''  || this._email == '' || this._pass == '' || this._pass2 == '' ) {
     alert("Please Fill All Fields",'Alert');
   }
   else {
     return this.validateEmail();
   }
}

Register.prototype.validateEmail = function() {
  var validate = new Validation(this._email);
  if (validate.emailValidate() == 'formatError') {
    alert('Plase enter valid lsbu email');
  }
  else if (validate.emailValidate() == 'invalid') {
    alert("Invalid Email",'Alert');
  }
  else {
    this.validatePassword();
  }
}

Register.prototype.validatePassword = function() {
  if (this._pass != this._pass2){
    this.formError = true;
    alert("Password Doesn't Match",'Alert');
  }
  else {
    return this.validateTC();
  }
}

Register.prototype.validateTC = function() {
  if (this.checkbox == false) {
    this.formError = true;
    alert('Agree terms and conditions')
  }
  else {
    return this.submit;
  }
}

Register.prototype.submit = function() {
  var dataString = 'name=' + this._name + '&email=' + this._email + '&pass=' + this._pass;
  var request = new Submitform('POST', this._url, dataString, false);
  request.ajaxSubmit(this);
  return false;
}

Register.prototype.submitResponse = function(response) {
  console.log(response)
  if (response.status == 1) {
    alert("Successfully registred");
  }
  else if(response.status == 0) {
    alert("Email already registred");
  }
}

Register.prototype.reloadForm = function() {
  inputVal.setValue(this.NameId, '');
  inputVal.setValue(this.EmailId, '');
  inputVal.setValue(this.PassId, '');
  inputVal.setValue(this.Pass2Id, '');
  return false;
}


registerUser = new Register();
