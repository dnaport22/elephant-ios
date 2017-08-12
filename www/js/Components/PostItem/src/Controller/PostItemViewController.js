PostReport.controller('PostItemViewController', function($timeout, $state, $scope, $ionicHistory, $localStorage ,$ionicActionSheet, UIfactory, DrupalHelperService, $rootScope, PostItemDataFactory, PostItemUploadFactory) {
  $scope.data = null;
  var IMAGE_URI = null;

  // Listens for image data ready event
  $rootScope.$on('$imageUriReady', function (event, data) {
    UIfactory.hideSpinner();
    IMAGE_URI = data;
    updateViewImage(IMAGE_URI);
  });

  $rootScope.$on('$onUploadFinished', function () {
    reloadForm();
  });

  var readyToCapture = function (source, quality) {
    var options = PostItemDataFactory.prepareCameraOptions(source, quality);
    PostItemDataFactory.executeCapture(options);
  };

  var updateViewImage = function (URI) {
    var image = document.getElementById('upImage');
    var photo = 'data:image/jpeg;base64,' + URI;
    image.style.backgroundImage = "url('" + photo + "')";
    document.getElementById("upload-image-container").style.display = "block";
    document.getElementById("select-image-button").innerHTML= "Reselect image";
  };

  /**
   * Dialog to select image input type.
   */
  $scope.imageOptions = function() {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-camera"></i>Capture using camera'},
        { text: '<i class="icon ion-images"></i>Select from gallery' }
      ],
      titleText: 'How would you like to select your image?',
      buttonClicked: function(index) {
        if (index == 0) {
          hideSheet();
          $scope.onTakePicture(Camera.PictureSourceType.CAMERA);
        }
        else if (index == 1) {
          hideSheet();
          $scope.onTakePicture(Camera.PictureSourceType.PHOTOLIBRARY);
        }
        else if (index == 2) {
          hideSheet();
        }
      }
    });
    $timeout(function() {
      hideSheet();
    }, 60000);
  };

  /**
   * @param source | (CAMERA or LIBRARY)
   */
  $scope.onTakePicture = function(source) {
    readyToCapture(source, 50);
  };

  /**
   * Executed by Post button in the viewport.
   */
  $scope.onPostItem = function () {
    if (validateMandatoryFields()) {
      PostItemDataFactory.postReportData();
    }
  };

  var validateMandatoryFields = function () {
    var title = inputVal.getValue('name');
    var body  = inputVal.getValue('desc');
    if (title === "" || body === "" || IMAGE_URI === null) {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', 'Please complete all fields and select an image.');
      return false;
    }
    PostItemDataFactory.newPostData.title = title;
    PostItemDataFactory.newPostData.body = DrupalHelperService.structureField({value: body});
    PostItemDataFactory.newPostData.field_user_mail = DrupalHelperService.structureField({value:  $localStorage.email});
    PostItemDataFactory.newPostData.field_item_image.base64 = IMAGE_URI;
    return true;
  };
  /**
   * Clear fields in the form.
   */
  var reloadForm = function() {
    inputVal.setValue('name', '');
    inputVal.setValue('desc', '');
    IMAGE_URI = null;
    document.getElementById("upload-image-container").style.display = "none";
    document.getElementById("select-image-button").innerHTML= "Select image";
  };

  /**
   * Checking input fields.
   */
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
  };

});
