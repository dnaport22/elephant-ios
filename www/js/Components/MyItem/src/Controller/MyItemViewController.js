MyItem.controller('MyItemViewController', function($scope, $http, $timeout, $localStorage, $ionicActionSheet, elephantData_URL, UIfactory, $templateCache, MyitemPageNotification, ViewsResource, DrupalHelperService, DrupalApiConstant) {

  /**
   * Variables and array to store and retrieve items
   */
  $scope.items = [];
  var itemOptions = {
    view_name: 'myitem',
    page: 0,
    pagesize: 5,
    format_output: 0
  };

  $scope.loadItems = function () {
    ViewsResource.retrieve(itemOptions)
      .then(function (res) {
        handleItemFeed(res.data)
      }, function (err) {
        console.log(err)
      })
  };

  /**
   * Initial loadMore() call handler.
   */
  var handleItemFeed = function(data) {
    //console.log(data)
    for (var i = 0; i < data.length; i++) {
      $scope.items = $scope.items.concat(prepareFeed(data[i]));
    }
  };

  //prepare article after fetched from server
  function prepareFeed(data) {
    if("field_item_image" in data && "und" in data.field_item_image) {
      angular.forEach(data.field_item_image.und, function (value, key) {

        var imgPath = data.field_item_image.und[key].uri.split('//')[1].replace(/^\/+/, "");
        data.field_item_image.und[key].imgPath = DrupalHelperService.getPathToImgByStyle(DrupalApiConstant.imageStyles.thumbnail) + imgPath;
        data.nid = parseInt(data.nid);
      });

    }

    return data;
  }

  // $scope.myitems = [];
  // var offset = 0;
  // var limit = 10;
  // var retrieved = 0;
  //
  // $scope.loadMore = function() {
  //   UIfactory.showSpinner();
  //   $http({ url: elephantData_URL.GET_USER_ITEM_URL, method: elephantData_URL.GET_USER_ITEM_TYPE, cache: $templateCache,
  //     params: {
  //       code: $localStorage.user_activation,
  //       offset: offset,
  //       limit: limit
  //     }}).success(function(response) {
  //     $scope.processData(response.items)
  //     retrieved = response.items.length
  //     offset += retrieved
  //     $scope.$broadcast('scroll.infiniteScrollComplete');
  //     UIfactory.hideSpinner();
  //   });
  // };
  //
  // $scope.processData = function(data) {
  //   console.log(data)
  //   for (i = 0; i < data.length; i++) {
  //     data[i]['image_url'] = 'http://service.myelephant.xyz/images/'+data[i]['image']
  //     $scope.myitems = $scope.myitems.concat(data[i])
  //   }
  // }
  //
  // $scope.check = function() {
  //   return retrieved > 0
  // }
  //
  // //Function checks status of the item
  // $scope.checkStatus = function(itemid, item){
  //   if(item.status == 0){
  //     $scope.onPending(itemid, item);
  //   }else if(item.status == 1){
  //     $scope.onApproved(itemid, item);
  //   }else if(item.status == -1){
  //     $scope.onGivenAway(itemid, item);
  //   }else{
  //     $scope.onDeclined(itemid, item);
  //   }
  // }
  //
  // //If item is in pending status
  // $scope.onPending = function(itemid, item){
  //   var hideSheet = $ionicActionSheet.show({
  //     buttons: [
  //       {text: 'Delete'},
  //     ],
  //     buttonClicked: function(index){
  //       if (index == 0) {
  //         var dataString = {
  //           code: $localStorage.user_activation,
  //           itemId: itemid
  //         }
  //         $scope.deleteItem(dataString, item);
  //         hideSheet();
  //       }
  //     }
  //   });
  //   $timeout(function() {
  //     hideSheet();
  //   }, 60000);
  // }
  // //If item is in approved state
  // $scope.onApproved = function(itemid, item){
  //   var hideSheet = $ionicActionSheet.show({
  //     buttons: [
  //       {text: 'Given away'},
  //       {text: 'Delete'}
  //     ],
  //     buttonClicked: function(index) {
  //       var dataString = {
  //         code: $localStorage.user_activation,
  //         itemId: itemid
  //       }
  //       if(index == 0){
  //         $scope.givenAway(dataString);
  //         hideSheet();
  //       }else if (index == 1) {
  //         $scope.deleteItem(dataString, item);
  //         hideSheet();
  //       }
  //     }
  //   });
  //   $timeout(function() {
  //     hideSheet();
  //   }, 60000);
  // }
  // //If item is in declined status
  // $scope.onDeclined = function(itemid, item){
  //   var hideSheet = $ionicActionSheet.show({
  //     buttons: [
  //       {text: 'Delete'},
  //     ],
  //     buttonClicked: function(index) {
  //       if (index == 0) {
  //         var dataString = {
  //           code: $localStorage.user_activation,
  //           itemId: itemid
  //         }
  //         $scope.deleteItem(dataString, item);
  //         hideSheet();
  //       }
  //     }
  //   });
  //   $timeout(function() {
  //     hideSheet();
  //   }, 60000);
  // }
  //
  // $scope.onGivenAway = function(itemid, item){
  //   var hideSheet = $ionicActionSheet.show({
  //     buttons: [
  //       {text: 'Re-post'},
  //       {text: 'Delete'}
  //     ],
  //     buttonClicked: function(index){
  //       var dataString = {
  //         code: $localStorage.user_activation,
  //         itemId: itemid
  //       }
  //       if(index == 0){
  //         $scope.reApprove(dataString);
  //         hideSheet();
  //       }else if(index == 1){
  //         $scope.deleteItem(dataString, item);
  //         hideSheet();
  //       }
  //     }
  //   });
  //   $timeout(function() {
  //     hideSheet();
  //   }, 60000);
  // }
  //
  // //Function which removes item
  // $scope.deleteItem = function(dataString, item){
  //   var deleteItemSubmit = new Submitform(elephantData_URL.DELETE_USER_ITEM_TYPE,elephantData_URL.DELETE_USER_ITEM_URL,dataString,false);
  //   deleteItemSubmit.ajaxSubmit(this);
  //
  //   $scope.onSuccess = function(response){
  //     console.log(dataString);
  //     var index = $scope.myitems.indexOf(item);
  //     $scope.myitems.splice(index, 1);
  //   }
  //
  //   $scope.onError = function(response){
  //     UIfactory.showAlert('Success', 'Item have been deleted');
  //   }
  // }
  //
  //
  // $scope.givenAway = function(dataString){
  //
  //   var giveAwaySubmit = new Submitform(elephantData_URL.GIVEN_AWAY_TYPE,elephantData_URL.GIVEN_AWAY_ITEM,dataString, false);
  //   giveAwaySubmit.ajaxSubmit(this);
  //
  //   $scope.onSuccess = function(response){
  //     UIfactory.showAlert('Success', 'Item have been marked as given away')
  //     .then(function(res){
  //       window.location.reload();
  //     });
  //   }
  //
  //   $scope.onError = function(response){
  //     console.log(response);
  //     UIfactory.showAlert('Error occured', 'An error occured while changing status to given away');
  //   }
  // }
  //
  // $scope.reApprove = function(dataString){
  //
  //   var reApproveSubmit = new Submitform(elephantData_URL.RE_APPROVE_TYPE, elephantData_URL.RE_APPROVE_ITEM, dataString, false)
  //   reApproveSubmit.ajaxSubmit(this);
  //
  //   $scope.onSuccess = function(response){
  //     UIfactory.showAlert('Success', 'Item have been marked as approved')
  //     .then(function(){
  //       window.location.reload();
  //     });
  //   }
  //
  //   $scope.onError = function(response){
  //     UIfactory.showAlert('Error occured', 'An error occured while changing status to approved');
  //   }
  // }
  //
  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.items = [];
    $scope.loadItems();
  });

});
