function Message(to_user, item_name, email, username) {
  this.msg = inputVal.getValue("user_message");
  this.item_name = item_name;
  this.toUserId = to_user;
  this.fromUser = email;
  this.fromUsername = username;
  this.itemid = '';
  this._url = 'http://www.maddna.xyz/message.php';
}

Message.prototype.processInput = function() {
  if (this.msg == '') {
    alert('Please enter you message','Alert');
  } else {
    return this.sendMessage();
  }
}

Message.prototype.sendMessage = function() {
  var dataString = 'msg='+this.msg+'&toUser='+this.toUserId+'&fromUser='+this.fromUser+'&itemName='+this.item_name+'&fromUsername='+this.fromUsername;
  var request = new Submitform('POST', this._url, dataString, false);
  request.ajaxSubmit(this);
  return false;
}

Message.prototype.submitResponse = function(response) {
  if (response == '1') {
    alert('Please keep an eye on your LSBU email account','Message Sent');
    this.reloadForm();
  }
  else {
    alert('Check if you internet is working','Error occurred');
  }
}

Message.prototype.reloadForm = function() {
  inputVal.setValue('user_message', 'Hey, I am interested in your item.');
  return false;
}
