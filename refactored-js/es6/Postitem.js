
class Postitem {
  constructor() {
    this.imageToUpload = '';
  }
  takePicture() {
    myApp.closeModal();
    navigator.camera.getPicture(this.onSuccess,this.onFail,{limit:1,
      quality:50,
      destinationType:Camera.DestinationType.FILE_URI,
      sourceType:navigator.camera.PictureSourceType.CAMERA,
      targetWidth: 720,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    });
  }
  selectPicture() {
    myApp.closeModal();
    navigator.camera.getPicture(this.onSuccess,this.onFail,{limit:1,
      quality:50,
      destinationType:Camera.DestinationType.FILE_URI,
      sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY
    });
  }
  onSuccess() {
    var image = document.getElementById('upImage');
    var photo = 'data:image/jpeg;base64,' + imageData;
    image.src = imageData;
    this.imageToUpload = imageData;
  }
  onFail() {
    myApp.alert('Error while opening camera');
  }
  uploadImage() {
    ajaxindicatorstart('');
    var fileURL = imageToUpload;
    var serverURL = "http://maddna.xyz/testup.php";
    var itemName = document.getElementById("itmnm").value;
    var itemDesc = document.getElementById("desc").value;
    if(itemName === "" || itemDesc === "") {
        ajaxindicatorstop('');
        myApp.alert("Please fill all fields",'Alert');
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
  onUploadSuccess(){
      ajaxindicatorstop('');
      myApp.alert('Item uploaded','Success');
      document.getElementById("itmnm").value='';
      document.getElementById("desc").value='';
      document.getElementById("upImage").src='images/up-image.png';
  }
  onUploadError(){
      ajaxindicatorstop('');
      myApp.alert('Error','Go Green');
  }
}
