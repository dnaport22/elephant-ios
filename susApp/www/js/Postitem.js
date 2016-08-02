angular.module('Postitem', [])

.controller('PostitemController', function($scope, $ionicActionSheet, $timeout) {

$scope.imageOptions = function() {

  var hideSheet = $ionicActionSheet.show({
    buttons: [
      { text: 'Capture using camera' },
      { text: 'Select from gallery' }
    ],
    titleText: 'How would you like to select picture?',
    buttonClicked: function(index) {
      if (index == 0) {
        itemImage.takePicture();
      }
      else if (index == 1) {
        itemImage.selectPicture();
      }
      else if (index == 2) {
        hideSheet();
      }
    }
  });
  $timeout(function() {
    hideSheet();
  }, 9000);

};
});

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
  navigator.camera.getPicture(this.onSuccess.bind(this), this.onFail,{limit:1,
    quality:50,
    destinationType:Camera.DestinationType.FILE_URI,
    sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY
  });
}

Postitem.prototype.onSuccess = function(imageData) {
  var image = document.getElementById('upImage');
  var photo = 'data:image/jpeg;base64,' + imageData;
  image.src = imageData;
  this.imageToUpload = imageData;
  console.log(this.imageToUpload)
}

Postitem.prototype.onFail = function() {
  alert('Error while opening camera');
}

Postitem.prototype.uploadImage = function() {
  var fileURL = this.imageToUpload;
  var serverURL = "http://maddna.xyz/postitem.php";
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
    params.code = localStorage.getItem('user_activation');
    options.params = params;

    var ft = new FileTransfer();
    console.log(ft)
    ft.upload(fileURL,serverURL,this.onUploadSuccess,this.onUploadError,options);
  }
}

Postitem.prototype.onUploadSuccess = function(data){
  console.log(data)
    alert('Item uploaded','Success');
    document.getElementById("itmnm").value='';
    document.getElementById("desc").value='';
    document.getElementById("upImage").src='images/up-image.png';
}

Postitem.prototype.onUploadError = function(data){
  console.log(data)
    alert('Error','Go Green');
}

itemImage = new Postitem();
