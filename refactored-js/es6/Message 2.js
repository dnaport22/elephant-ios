
class Message {
  constructor() {
    this._msg = '';
    this.itemName = '';
    this._toUser = '';
    this._fromUser = '';
  }
  messageCheck(postid) {
    this._postid = postid;
    if (localStorage.getItem('loggedID') == 1){
  		this.message(this._postid);
  	}else{
  		activate_page('#login-page');
  	}
  }

  processInput(postid) {
    var msg = inputVal.getValue("userMessage");
  	var itemName = inputVal.getValue("itemName");
  	var toUser = inputVal.getValue(postid);
  	var fromUser = localStorage.getItem('loggeduser');
  	var fromUsername = localStorage.getItem('loggedusername');
    if (msg == '') {
      alert('Please enter you message','Alert');
    } else {
      return this.sendMessage();
    }

  sendMessage() {

  }
  	var dataString = 'msg='+msg+'&toUser='+toUser+'&fromUser='+fromUser+'&itemName='+itemName+'&fromUsername='+fromUsername;
    if (msg == ''){
  		myApp.alert('Please enter you message','Alert');
  	}else{
  		$.ajax({
  		url: "http://www.maddna.xyz/message.php",
  		type: "POST",
  		data: dataString,
  		cache: false,
  		success:function(status){
  			if(status == '1'){
  				myApp.alert('Please keep an eye on your LSBU email account','Message Sent')
  			}
  			else{
  				myApp.alert('Check if you internet is working','Error occurred')
  		}
  	},
  		error:function(){
  			ajaxindicatorstop();
  			myApp.alert('Please contact technical support','Error occurred')
  		}
  	});
   }
  	document.getElementById("userMessage").value='';
  }
}
