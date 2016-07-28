// Class to login users
function Login() {
    this.EmailId = 'login_email';
    this.PassId = 'login_pass';
    this._email = '';
    this._pass = '';
    this._url = 'http://maddna.xyz/login.php';
}

Login.prototype.processInput = function() {
   this._email = inputVal.getValue(this.EmailId);
   this._pass = inputVal.getValue(this.PassId);
   if (this._email == ''  || this._pass == '') {
     alert("Please Fill All Fields",'Alert');
   }
   else {
     return this.validateEmail();
   }
}

Login.prototype.validateEmail = function() {
  var validate = new Validation(this._email);
  if (validate.emailValidate() == 'formatError') {
    alert('Plase enter valid lsbu email');
  }
  else if (validate.emailValidate() == 'invalid') {
    alert("Invalid Email",'Alert');
  }
  else {
    this.submit();
  }
}

Login.prototype.submit = function() {
  var dataString = 'email=' + this._email + '&pass=' + this._pass;
  var request = new Submitform('POST', this._url, dataString, false);
  request.ajaxSubmit(this);
  return false;
}

Login.prototype.submitResponse = function(response) {
  if (response.status == 0) {
    alert("Invalid account","Alert");
  }
  else if(response.status == 1) {
    if(response.user.status == 0) {
      alert("Activate your account","Alert");
    }
    else {
      alert("You can now get or post items","You are now logged in");
      this.userStorage(response.user);
    }
  }
}

Login.prototype.userStorage = function(data) {
  localStorage.setItem('user_username', data.name);
  localStorage.setItem('user_email', data.email);
  localStorage.setItem('user_status', data.status);
}

Login.prototype.reloadForm = function() {
  inputVal.setValue(this.EmailId, '');
  inputVal.setValue(this.PassId, '');
  return false;
}

loginUser = new Login();
