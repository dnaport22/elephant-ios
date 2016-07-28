class DrawerLinks {
  constructor() {
    this._url = 'http://www.maddna.xyz/session_1.php';
    this._userStatus = localStorage.getItem('loggedID');
    this._userEmail = localStorage.getItem('loggeduser');
  }

  updateLinks() {
    if (this._userStatus == '1'){
      this.hideLink('#loginLink');
      this.getUsername();
    }
    else {
      this.hideLink('#logoutLink');
      this.hideLink('#myitemsLink');
      this.hideLink('#feedbackLink');
      this.hideLink('#userName');
    }
  }

  getUsername() {
    var dataString = 'loggeduser='+ this._userEmail;
    var request = new Submitform('POST', 'http://www.maddna.xyz/session_1.php', dataString, false);
    if (request.ajaxSubmit() == 1) {
      $('#userName').html(request.ajaxSubmit());
      localStorage.setItem('loggedusername', request.ajaxSubmit());
    }
    else {
      $('#userName').html('Hello User');
    }
  }

  hideLink(link) {
    return $(link).hide();
  }
}
