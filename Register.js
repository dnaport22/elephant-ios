// Class to register users

class Register {

  constructor() {
    this.NameId = 'set_name';
    this.EmailId = 'set_email';
    this.PassId = 'set_pass';
    this.Pass2Id = 'set_pass2';
    this._name = '';
    this._email = '';
    this._pass = '';
    this._pass2 = '';
    this._url = 'http://maddna.xyz/register.php';
  }

  processInput() {
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

  validateEmail() {
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

  validatePassword() {
    if (this._pass != this._pass2){
      this.formError = true;
      alert("Password Doesn't Match",'Alert');
    }
    else {
      return this.validateTC();
    }
  }

  validateTC() {
    var terms = document.getElementById('tcCheck').checked;
    if (terms == false) {
      this.formError = true;
      alert('Agree terms and conditions')
    }
    else {
      return this.submit();
    }
  }

  submit() {
    var dataString = 'name=' + this._name + '&email=' + this._email + '&pass=' + this._pass;
    var request = new Submitform('POST', this._url, dataString, false);
    if (request.ajaxSubmit() == 0) {
      alert("Email is already in use.","Registration Error");
    }
    else {
      alert("We have emailed you the verification link.","Registered Successfully");
      this.reloadForm();
    }
    return false;
  }

  reloadForm() {
    inputVal.setValue(this.NameId, '');
    inputVal.setValue(this.EmailId, '');
    inputVal.setValue(this.PassId, '');
    inputVal.setValue(this.Pass2Id, '');
    return false;
  }
}

registerUser = new Register();
