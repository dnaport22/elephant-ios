PostReport.factory('PostItemDataFactory', function ($cordovaCamera, $rootScope, UIfactory, PostItemUploadFactory) {

  var IMAGE_URI = null;

  return {
    newPostData: {
      type: 'items',
      title: null,
      body: null,
      field_user_mail: null,
      field_publishing_state: {und: {tid: 2}},
      field_item_image: {base64: null}
    },
    prepareCameraOptions: function (source, quality) {
      return options = {
        quality: quality,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: source,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 480,
        targetHeight: 480,
        popoverOption: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation: true,
        MediaType: 0
      };
    },
    executeCapture: function (options) {
      $cordovaCamera.getPicture(options)
        .then(function(imageURI){
          UIfactory.showSpinner();
          $rootScope.$emit('$imageUriReady', imageURI);
      }, function(err) {
        UIfactory.hideSpinner();
        UIfactory.showAlert('Error', 'Error retrieving the image file');
      });
    },
    getImageUri: function () {
      return IMAGE_URI;
    },
    postReportData: function () {
      PostItemUploadFactory.setUploadType(1);
      PostItemUploadFactory.setUploadData(this.newPostData);
      PostItemUploadFactory.uploadData();
    }
  }
});
