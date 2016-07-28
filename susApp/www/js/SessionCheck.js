function SessionCheck() {
  type: 'Logged user';
  msgCheckId: 'itemId';
}

SessionCheck.prototype.postCheck = function() {
  if (localStorage.getItem('loggedID') == '1') {
    activate_page('#post-items');
  }
  else {
    activate_page('#login-page');
  }
}

SessionCheck.prototype.getCheck = function() {
  activate_page('#get-items');
}

SessionCheck.prototype.checkLogin = function(){
  if (localStorage.getItem('loggedID') == '1') {
    activate_page('#get-items');
  }
  else {
    activate_page('#login-page');
  }
}

SessionCheck.prototype.messageCheck = function() {
  if (localStorage.getItem('loggedID') == 1){
    var msg = new Message(this._msgCheckId);
		msg.processInput();
	}else{
		activate_page('#login-page');
	}
}

session = new SessionCheck();
