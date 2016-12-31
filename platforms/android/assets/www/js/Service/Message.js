elephant.service('MessageService', function(UIfactory, elephantData_URL, $ionicAnalytics) {

  this.constructor = function(to_user, item_name, email, username) {
    this.msg = inputVal.getValue("user_message");
    this.item_name = item_name;
    this.toUserId = to_user;
    this.fromUser = email;
    this.fromUsername = username;
    this.itemid = null;
    this.url = elephantData_URL.REQUEST_ITEM_URL;
  }

  this.processInput = function() {
    if (this.msg == '') {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', 'Please enter your message.');
    } else {
      return this.sendMessage();
    }
  }

  this.sendMessage = function() {
    var dataString = {
      msg: this.msg,
      toUser: this.toUserId,
      fromUser: this.fromUser,
      itemName: this.item_name,
      fromUsername: this.fromUsername
    }
    var request = new Submitform('POST', this.url, dataString, false);
    request.ajaxSubmit(this);
    return false;
  }

  this.onSuccess = function(response) {
    //Ionic analytics below
    $ionicAnalytics.track('Item Request', {item_name: this.item_name, request_user: this.toUserId})
    if (response == '1') {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Message Sent', 'Response will be sent to your LSBU email account.');
      this.reloadForm();
    }
    else {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Error occurred', 'Please check your internet connection.');
    }
  }

  this.reloadForm = function() {
    inputVal.setValue('user_message', '');
    return false;
  }

})
