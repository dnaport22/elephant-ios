// Class to login users
class Login {
  constructor() {
    this.EmailId = 'login_email';
    this.PassId = 'login_pass';
    this._email = '';
    this._pass = '';
    this._url = 'http://maddna.xyz/register.php';
  }

  processInput() {
    this._email = inputVal.getValue(this.EmailId);
    this._pass = inputVal.getValue(this.PassId);
    if (this._email == ''  || this._pass == '') {
      alert("Please Fill All Fields",'Alert');
    }
    else {
      return this.validateEmail();
    }
  }

  validateEmail() {
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

  submit() {
    var dataString = 'email=' + this._email + '&pass=' + this._pass;
    var request = new Submitform('POST', this._url, dataString, false);
    if (request.ajaxSubmit(); == 'pending') {
      alert("Please activate you account","Alert");
    }
    else if(status == 'approved') {
      activate_page('#mainpage')
      alert("You can now get or post items","You are now logged in")
      localStorage.setItem('loggeduser',email);
      localStorage.setItem('loggedID','1');
    }
    else if(status == 'failed') {
        alert("No account found!, Please Register","Alert");
    }
    return false;
  }

  reloadForm() {
    inputVal.setValue(this.EmailId, '');
    inputVal.setValue(this.PassId, '');
    return false;
  }
}


loginUser = new Login();
