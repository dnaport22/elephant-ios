elephant.controller('User', function() {
  this.checkInput = function(email, pass) {
    if (email == ''  || pass == '') {
      popAlert.showAlert('Alert', 'Please fill all the fields');
    }
    else {
      return this.validateEmail();
    }
  }
  this.validateEmail = function() {

  }
})
