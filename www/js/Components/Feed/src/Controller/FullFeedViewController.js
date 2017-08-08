Feed.controller('FullFeedViewController', function($http, $scope, $stateParams, $location, CurrentUserfactory, $localStorage, UIfactory, DrupalHelperService, DrupalApiConstant, CommentResource) {
  $scope.item = prepareFeed($stateParams.feed);
  console.log($scope.item)

  function prepareFeed(data) {
    if("field_item_image" in data && "und" in data.field_item_image) {
      angular.forEach(data.field_item_image.und, function (value, key) {

        var imgPath = data.field_item_image.und[key].uri.split('//')[1].replace(/^\/+/, "");
        data.field_item_image.und[key].imgPath = DrupalHelperService.getPathToImgByStyle(DrupalApiConstant.imageStyles.medium) + imgPath;
        data.nid = parseInt(data.nid);
      });

    }

    return data;
  }

  $scope.messageCheck = function() {
    UIfactory.showSpinner();
    var data = {
      sender_mail: $localStorage.email,
      reciever_mail: $scope.item.field_user_mail.und[0].value,
      item_name: $scope.item.title,
      message: inputVal.getValue('user_message')
    };
    if ($localStorage.authenticated) {
      $http.post('https://us-central1-elephant-app-c68a7.cloudfunctions.net/sendMail', data)
      .then(function (res) {
        UIfactory.hideSpinner();
        console.log(res)
      }, function (err) {
        UIfactory.hideSpinner();
        console.log(err)
      })
    }
    else {
      $location.path("/app/login/getitem")
    }
  };


  $scope.checkMaxLength = function() {
    var mesageName = document.getElementById("user_message");
    var mesageNameMaxLength = document.getElementById("user_message").maxLength;
    var mesageNameWarning = document.getElementById("user_message-warning");

    if (mesageName.value.length == mesageNameMaxLength) {
      mesageName.style.color = "red";
      mesageNameWarning.style.display = "block";
    } else {
      mesageName.style.color = "black";
      mesageNameWarning.style.display = "none";
    }
  }

});

