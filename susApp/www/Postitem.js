
function Postitem() {
    this.imageToUpload = '';
}

Postitem.prototype.takePicture = function() {
  navigator.camera.getPicture(this.onSuccess,this.onFail,{limit:1,
    quality:50,
    destinationType:Camera.DestinationType.FILE_URI,
    sourceType:navigator.camera.PictureSourceType.CAMERA,
    targetWidth: 720,
    encodingType: Camera.EncodingType.JPEG,
    correctOrientation: true
  });
}

Postitem.prototype.selectPicture = function() {
  navigator.camera.getPicture(this.onSuccess,this.onFail,{limit:1,
    quality:50,
    destinationType:Camera.DestinationType.FILE_URI,
    sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY
  });
}

Postitem.prototype.onSuccess = function() {
  var image = document.getElementById('upImage');
  var photo = 'data:image/jpeg;base64,' + imageData;
  image.src = imageData;
  this.imageToUpload = imageData;
}

Postitem.prototype.onFail = function() {
  alert('Error while opening camera');
}

Postitem.prototype.uploadImage = function() {
  var fileURL = this.imageToUpload;
  var serverURL = "http://maddna.xyz/testup.php";
  var itemName = document.getElementById("itmnm").value;
  var itemDesc = document.getElementById("desc").value;
  if(itemName === "" || itemDesc === "") {
      alert("Please fill all fields",'Alert');
  }
  else {
    var dataString = 'name=' + itemName + '&desc=' + itemDesc;
    var options = new FileUploadOptions();
    options.fileKey = 'file';
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
    options.mimeType = "image/jpeg";

    var params = new Object();
    params.itemName = itemName;
    params.desc = itemDesc;
    params.postUser = localStorage.getItem('loggeduser');
    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL,serverURL,this.onUploadSuccess,this.onUploadError,options);
  }
}

Postitem.prototype.onUploadSuccess = function(){
    alert('Item uploaded','Success');
    document.getElementById("itmnm").value='';
    document.getElementById("desc").value='';
    document.getElementById("upImage").src='images/up-image.png';
}

Postitem.prototype.onUploadError = function(){
    alert('Error','Go Green');
}
