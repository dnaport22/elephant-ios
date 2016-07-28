function Logout() {
  this._url = "http://maddna.xyz/logout.php";
}
Logout.prototype.logoutUser() {
  var request = new Submitform('GET', this._url, false);
  if (request.ajaxSubmit() == 1) {
    alert('Logout');
    localStorage.setItem("loggedID", '0');
    localStorage.removeItem("loggeduser";)
  }
}
