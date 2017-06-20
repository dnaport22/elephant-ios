PostReport.factory('PostItemUploadFactory', function ($q, $cordovaFileTransfer, UIfactory, $localStorage, FileResource, NodeResource, DrupalHelperService, DrupalApiConstant, $cordovaFile, $rootScope, AuthenticationService) {
  var imageUri = null;
  var newPostData = null;
  var uploadType = null;

  var readyToUpload = function (filename) {
    AuthenticationService.refreshConnection()
      .then(function (res) {
        uploadNode(filename);
      });
  };

  var sanitiseProvider = function (fileName) {
    file = fileName.substr(fileName.lastIndexOf('/')+1);
    var fileCheck = file.split('.jpg');
    if (fileCheck[1] == '') {
      return new Date().getTime() + file;
    }
    else {
      return new Date().getTime() + '.jpg';
    }
  };

  var uploadImage = function (data, name) {
    var newImage = {};
    newImage.file = data.split(',').pop();
    newImage.filename = name;
    newImage.filesize = newImage.file.length;
    newImage.filepath = 'field/image/';
    newImage.filemime = "image/jpeg";
    newImage.image_file_name = name;

    return FileResource.create(newImage);
  };

  var uploadNode = function (name) {
    uploadImage(newPostData.field_image.base64, name)
    .then(function (response) {
      data.field_image = DrupalHelperService.structureField({fid: response.data.fid});
    }, function (error) {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', 'Error occurred while uploading report!');
    })
    .finally(function () {
      NodeResource.create(data)
      .then(function (res) {
        $rootScope.$emit('$onUploadFinished');
        UIfactory.hideSpinner();
        UIfactory.showAlert('Success', 'Report uploaded');
      }, function (err) {
        UIfactory.hideSpinner();
        UIfactory.showAlert('Alert', 'Error occurred while uploading report!');
      })
    })
  };

  return {
    init: function (image_uri) {
      imageUri = image_uri;
      loadImage(image_uri)
    },
    prepareFileName: function (fileName) {
      return sanitiseProvider(fileName);
    },
    uploadData: function (filename) {
      return readyToUpload(filename);
    },
    setUploadType: function (type) {
      uploadType = type;
    },
    setUploadData: function (data) {
      newPostData = data;
    }
  }
});
