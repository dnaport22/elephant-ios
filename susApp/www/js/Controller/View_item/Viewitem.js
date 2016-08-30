elephant.controller('ViewController', function($scope, $stateParams, $location, $localStorage, MessageService, UIfactory) {
  $scope.item_name = $stateParams.itemName;
  $scope.item_description = $stateParams.itemDesc;
  $scope.item_date = $stateParams.itemDate;
  $scope.item_img = $stateParams.itemImg;

  $scope.$storage = $localStorage.$default({
    user_email: null,
    user_username: null,
  })


  $scope.messageCheck = function() {
    UIfactory.showSpinner();
    if ($localStorage.user_login_id == 1) {
      var item_uid = $stateParams.itemUid;
      var email = $localStorage.user_email;
      var username = $localStorage.user_username;
      var itemRequest = MessageService;
      itemRequest.constructor(item_uid, $scope.item_name, email, username)
      itemRequest.processInput();
    }
    else {
      $location.path("/app/login/getitem")
    }
  }


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
