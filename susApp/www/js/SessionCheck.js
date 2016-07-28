function SessionCheck() {
  type: 'Logged user';
  msgCheckId: 'itemId';
}

SessionCheck.prototype.postCheck = function() {
  ajaxindicatorstart('');
  if (localStorage.getItem('loggedID') == '1') {
    activate_page('#post-items');
    ajaxindicatorstop();
  }
  else {
    activate_page('#login-page');
    ajaxindicatorstop();
  }
}

SessionCheck.prototype.getCheck = function() {
  ajaxindicatorstart('');
  activate_page('#get-items');
  ajaxindicatorstop();
}

SessionCheck.prototype.checkLogin = function(){
  ajaxindicatorstart('');
  if (localStorage.getItem('loggedID') == '1') {
    activate_page('#get-items');
    ajaxindicatorstop();
  }
  else {
    activate_page('#login-page');
    ajaxindicatorstop();
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
