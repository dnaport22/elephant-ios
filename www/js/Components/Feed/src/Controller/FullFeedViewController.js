Feed.controller('FullFeedViewController', function($http, $scope, $stateParams, $location, CurrentUserfactory, $localStorage, UIfactory, DrupalHelperService, DrupalApiConstant, CommentResource) {
  $scope.item = $stateParams.feed;

  function prepareFeed(data) {
    if("field_item_image" in data && "und" in data.field_item_image) {
      angular.forEach(data.field_item_image.und, function (value, key) {

        var imgPath = data.field_item_image.und[key].uri.split('//')[1].replace(/^\/+/, "");
        data.field_item_image.und[key].imgPath = DrupalHelperService.getPathToImgByStyle(DrupalApiConstant.imageStyles.large) + imgPath;
        data.nid = parseInt(data.nid);
      });

    }
    return data;
  }

  $scope.onSendMessage = function () {
		UIfactory.showSpinner();
    if (inputVal.getValue('user_message') === "") {
      UIfactory.hideSpinner();
      UIfactory.showAlert("Alert", "Message field cannot be empty.");
    } else {
      sendMessage();
    }
	};

  var sendMessage = function() {
    if ($localStorage.authenticated) {
			var data = {
				sender_mail: $localStorage.email,
				reciever_mail: $scope.item.field_user_mail.und[0].value,
				sender_name: $localStorage.email.split('@')[0],
				item_name: $scope.item.title,
				item_image: $scope.item.field_item_image.und[0].imgPath,
				message: inputVal.getValue('user_message')
			};
      $http.post('https://us-central1-elephant-app-c68a7.cloudfunctions.net/sendMail', data)
      .then(function (res) {
        UIfactory.hideSpinner();
				UIfactory.showAlert('Message Sent', 'Response will be sent to your LSBU email account.');
				reloadForm();
      }, function (err) {
				UIfactory.hideSpinner();
				UIfactory.showAlert('Error occurred', 'Please check your internet connection.');
      })
    }
    else {
			UIfactory.hideSpinner();
      $location.path("/app/login/getitem");
    }
  };

	var reloadForm = function() {
		inputVal.setValue('user_message', '');
		return false;
	};

  $scope.checkMaxLength = function() {
    var mesageName = document.getElementById("user_message");
    var mesageNameMaxLength = document.getElementById("user_message").maxLength;
    var mesageNameWarning = document.getElementById("user_message-warning");

    if (mesageName.value.length === mesageNameMaxLength) {
      mesageName.style.color = "red";
      mesageNameWarning.style.display = "block";
    } else {
      mesageName.style.color = "black";
      mesageNameWarning.style.display = "none";
    }
  }

});

