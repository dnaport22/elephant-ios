elephant.controller('RegisterController', function($scope, UIfactory, $ionicHistory, registerFactory, elephantData_AUTH) {
  $scope.isChecked = {
    checkbox: false
  }
  var registerDataId = elephantData_AUTH;

  var nameId = registerDataId.REGISTER_NAME;
  var emailId = registerDataId.REGISTER_EMAIL;
  var passId = registerDataId.REGISTER_PASS;
  var pass2Id = registerDataId.REGISTER_PASS_VALIDATE;

  $scope.registerUser = function() {
    var name = inputVal.getValue(nameId);
    var email = inputVal.getValue(emailId);
    var pass = inputVal.getValue(passId);
    var pass2 = inputVal.getValue(pass2Id);
    var register = new registerFactory;
    register.processInput(name, email, pass, pass2, $scope.isChecked.checkbox)
  }

  // this.NameId = 'set_name';
  // this.EmailId = 'set_email';
  // this.PassId = 'set_pass';
  // this.Pass2Id = 'set_pass2';
  // this.name = inputVal.getValue(this.NameId);
  // this.email = inputVal.getValue(this.EmailId);
  // this.pass = inputVal.getValue(this.PassId);
  // this.pass2 = inputVal.getValue(this.Pass2Id);
  // this.url = 'http://maddna.xyz/register.php';
  //
  // this.processInput = function() {
  //    var nameMatching = name.match(this.nameMatch);
  //    if (this.name == ''  || this.email == '' || this.pass == '' || this.pass2 == '' ) {
  //      UIfactory.showAlert('Alert', 'Please fill all the fields');
  //    }
  //    else {
  //      return this.validateEmail();
  //    }
  // }
  //
  // this.validateEmail = function() {
  //   var validate = new Validation(this.email);
  //   if (validate.emailValidate() == 'formatError') {
  //     UIfactory.showAlert('Alert', 'Please enter valid LSBU email address');
  //   }
  //   else if (validate.emailValidate() == 'invalid') {
  //     UIfactory.showAlert('Alert', 'Invalid email');
  //   }
  //   else {
  //     this.validatePassword();
  //   }
  // }
  //
  // this.validatePassword = function() {
  //   if (this.pass != this.pass2){
  //     UIfactory.showAlert('Alert', 'Password does not match');
  //   }
  //   else {
  //     return this.validateTC();
  //   }
  // }
  //
  // this.validateTC = function() {
  //   if (this.isChecked.checkbox == false) {
  //     UIfactory.showAlert('Alert', 'Agree terms and conditions')
  //   }
  //   else {
  //     return this.submit();
  //   }
  // }
  //
  // this.submit = function() {
  //   var dataString = 'name=' + this.name + '&email=' + this.email + '&pass=' + this.pass;
  //   var request = new Submitform('POST', this.url, dataString, false);
  //   request.ajaxSubmit(this);
  //   return false;
  // }
  //
  // this.submitResponse = function(response) {
  //   if (response.status == 1) {
  //     UIfactory.showAlert('Registred successfully', 'A validation email has been sent to your LSBU email account, please validate your email to start using your account.');
  //     this.reloadForm();
  //   }
  //   else if(response.status == 0) {
  //     UIfactory.showAlert('Alert', 'Email already registred');
  //   }
  // }
  //
  // this.reloadForm = function() {
  //   inputVal.setValue(this.NameId, '');
  //   inputVal.setValue(this.EmailId, '');
  //   inputVal.setValue(this.PassId, '');
  //   inputVal.setValue(this.Pass2Id, '');
  //   this.isChecked.checkbox = false;
  //   return $ionicHistory.goBack();;
  // }

})
