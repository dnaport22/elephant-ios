elephant.controller('ViewController', function($scope, $stateParams, $location, $localStorage, MessageService, elephantData_URL) {
  // $scope.item_name = $stateParams.itemName;
  // $scope.item_description = $stateParams.itemDesc;
  // $scope.item_date = $stateParams.itemDate;
  // $scope.item_img = $stateParams.itemImg;
  var itemId = $stateParams.itemId;
  // var item_uid = $stateParams.itemUid;
  // var email = $localStorage.user_email;
  // var username = $localStorage.user_username;

  $scope.approveItem = function() {
    var dataString = {
      itemId: itemId
    }
    var approveRequest = new Submitform(elephantData_URL.APPROVE_ADMIN_ITEM_TYPE, elephantData_URL.APPROVE_ADMIN_ITEM_URL, dataString, false)
    approveRequest.ajaxSubmit(this)
  }

  $scope.declineItem = function() {
    var dataString = {
      itemId: itemId
    }
    var approveRequest = new Submitform(elephantData_URL.DECLINE_ADMIN_ITEM_TYPE, elephantData_URL.DECLINE_ADMIN_ITEM_URL, dataString, false)
    approveRequest.ajaxSubmit(this)
  }

  $scope.submitResponse = function(response) {
    console.log(response)
  }


  /*
   * Part below is not required for now in admin panel however it might be usefull in future.
   */

  // $scope.messageCheck = function() {
  //   if ($localStorage.user_login_id == 1) {
  //     var itemRequest = MessageService;
  //     itemRequest.constructor(item_uid, $scope.item_name, email, username)
  //     itemRequest.processInput();
  //   }
  //   else {
  //     $location.path("/app/login/getitem")
  //   }
  // }
  //
  // $scope.defaultMessagevalue = "Hey, I am interested in your " + $scope.item_name;
  //
  // $scope.checkMaxLength = function() {
  //   var mesageName = document.getElementById("user_message");
  //   var mesageNameMaxLength = document.getElementById("user_message").maxLength;
  //   var mesageNameWarning = document.getElementById("user_message-warning");
  //
  //   if (mesageName.value.length == mesageNameMaxLength) {
  //     mesageName.style.color = "red";
  //     mesageNameWarning.style.display = "block";
  //   } else {
  //     mesageName.style.color = "black";
  //     mesageNameWarning.style.display = "none";
  //   }
  // }
});
