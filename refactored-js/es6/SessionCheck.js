class SessionCheck {
  constructor() {
    this.type = 'Logged user';
    this.msgCheckId = 'itemId';
  }

  postCheck() {
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

  getCheck() {
    ajaxindicatorstart('');
    activate_page('#get-items');
    ajaxindicatorstop();
  }

  checkLogin() {
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

  messageCheck() {
    if (localStorage.getItem('loggedID') == 1){
      var msg = new Message(this._msgCheckId);
  		msg.processInput();
  	}else{
  		activate_page('#login-page');
  	}
  }

}

session = new SessionCheck();
