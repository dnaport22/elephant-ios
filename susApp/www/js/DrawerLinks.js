// Class to perform small auth checks

function DrawerLinks() {
  this._url = 'http://www.maddna.xyz/session_1.php';
  this._userStatus = localStorage.getItem('loggedID');
  this._userEmail = localStorage.getItem('loggeduser');
}

DrawerLinks.prototype.updateLinks = function() {
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

DrawerLinks.prototype.getUsername = function() {
  var dataString = 'loggeduser='+ this._userEmail;
  var request = new Submitform('POST', 'http://www.maddna.xyz/session_1.php', dataString, false);
  if (request.ajaxSubmit() == 1) {
    $('#userName').html(data);
    localStorage.setItem('loggedusername', request.ajaxSubmit());
  }
}

DrawerLinks.prototype.hideLink = function(link) {
  return $(link).hide();
}
