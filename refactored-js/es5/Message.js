function Message(itemid) {
    this._msg = '';
    this.itemName = '';
    this._toUser = '';
    this._fromUser = '';
    this._fromUsername = '';
    this._itemid = '';
    this._url = 'http://www.maddna.xyz/message.php';
}

Message.prototype.processInput = function() {
  var msg = inputVal.getValue("userMessage");
	var itemName = inputVal.getValue("itemName");
	var toUser = inputVal.getValue(this._itemid);
	var fromUser = localStorage.getItem('loggeduser');
	var fromUsername = localStorage.getItem('loggedusername');
  if (msg == '') {
    alert('Please enter you message','Alert');
  } else {
    return this.sendMessage();
  }
}

Message.prototype.sendMessage = function() {
  var dataString = 'msg='+msg+'&toUser='+toUser+'&fromUser='+fromUser+'&itemName='+itemName+'&fromUsername='+fromUsername;
  var request = new Submitform('POST', this._url, dataString, false);
  if (request.ajaxSubmit() == '1') {
    alert('Please keep an eye on your LSBU email account','Message Sent');
    this.reloadForm();
  }
  else {
    alert('Check if you internet is working','Error occurred');
  }
  return false;
}

Message.prototype.reloadForm = function() {
  inputVal.setValue('userMessage', '');
  return false;
}
