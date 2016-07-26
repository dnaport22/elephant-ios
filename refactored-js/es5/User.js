// Class to perform small auth checks

function getName(){
  if (localStorage.getItem('loggedID') == '1'){
    var user = localStorage.getItem('loggeduser');
    var dataString = 'loggeduser='+ user;
    var request = new Submitform('POST', 'http://www.maddna.xyz/session_1.php', dataString, false);
    if (request.ajaxSubmit() == '1') {
      $('#userName').html(data);
      $('#loginLink').hide();
      localStorage.setItem('loggedusername', request.ajaxSubmit());
    }
    else {
      $('#logoutLink').hide();
      $('#myitemsLink').hide();
      $('#feedbackLink').hide();
      $('#userName').hide();
    }
  }
}
