angular.module('Postitem', [])

.controller('PostitemController', function($scope,$localStorage ,$ionicActionSheet, $timeout, $cordovaCamera, $cordovaFileTransfer, $window, $ionicLoading) {

  $scope.imageOptions = function() {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Capture using camera' },
        { text: 'Select from gallery' }
      ],
      titleText: 'How would you like to select picture?',
      buttonClicked: function(index) {
        if (index == 0) {
          $scope.takePicture(Camera.PictureSourceType.CAMERA);
        }
        else if (index == 1) {
          $scope.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
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

  $scope.imageToUpload = null;

  $scope.takePicture = function(source) {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 720,
      popoverOption: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      MediaType: 0
    };

    $cordovaCamera.getPicture(options)
    .then(function(imageURI){
      console.log(imageURI)
      var image = document.getElementById('upImage');
      var photo = 'data:image/jpeg;base64,' + imageURI;
      image.style.backgroundImage = "url('" + imageURI + "')";
      $scope.imageToUpload = imageURI;
      document.getElementById("upload-image-container").style.display = "block";
      document.getElementById("select-image-button").innerHTML= "Reselect Image";
      console.log($scope.imageToUpload)
    }, function(err) {
      alert('Error while calling native components');
      console.log(err)
    });


  }

  $scope.uploadItem = function() {
    $ionicLoading.show({animation: 'fade-in', showBackdrop: true, maxWidth: 200,});
    var fileURL = $scope.imageToUpload;
    var serverURL = "http://maddna.xyz/postitem.php";
    var itemName = document.getElementById("name").value;
    var itemDesc = document.getElementById("desc").value;
    if(itemName === "" || itemDesc === "") {
      $ionicLoading.hide();
      alert("Please fill all fields",'Alert');
    }
    if(fileURL == null) {
      $ionicLoading.hide();
      alert("Please select an image",'Alert');
    }
    else {
      var imageSrc = $scope.getFileName(fileURL);
      var options = new FileUploadOptions();
      options.fileKey = 'file';
      options.fileName = imageSrc;
      options.mimeType = "image/jpeg";

      var params = new Object();
      params.itemName = itemName;
      params.desc = itemDesc;
      params.code = $localStorage.user_activation;
      options.params = params;

      $cordovaFileTransfer.upload(serverURL, fileURL, options)
        .then(function(result) {
          $ionicLoading.hide();
          alert("Item uploaded")
          console.log(result)
          $cordovaCamera.cleanup();
        }, function(err) {
          $ionicLoading.hide();
          alert("Item upload error")
          console.log(err)
          $cordovaCamera.cleanup();
        }, function(progress) {
          console.log(progress)
        }
      )
    }
  }

  $scope.getFileName = function(fileName) {
    file = fileName.substr(fileName.lastIndexOf('/')+1);
    finalName = null;
    fileCheck = file.split('.jpg');
    if (fileCheck[1] == '') {
      return file;
    }
    else {
      return fileCheck[0]+'.jpg';
    }
  }

  $scope.checkMaxLength = function() {
    var itemName = document.getElementById("name");
    var itemNameMaxLength = document.getElementById("name").maxLength;
    var itemNameWarning = document.getElementById("name-warning");
    var itemDesc = document.getElementById("desc");
    var itemDescMaxLength = document.getElementById("desc").maxLength;
    var itemDescWarning = document.getElementById("desc-warning");

    if (itemName.value.length == itemNameMaxLength) {
      itemName.style.color = "red";
      itemNameWarning.style.display = "block";
    } else {
      itemName.style.color = "black";
      itemNameWarning.style.display = "none";
    }

    if (itemDesc.value.length == itemDescMaxLength) {
      itemDesc.style.color = "red";
      itemDescWarning.style.display = "block";
    } else {
      itemDesc.style.color = "black";
      itemDescWarning.style.display = "none";
    }
  }

  $scope.goBack = function() {
    $window.location.href = '#/app/main'
  }
});
