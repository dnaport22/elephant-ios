MyItem.controller('MyItemViewController', function(ITEM_STATES, $scope, $http, $timeout, $localStorage, $ionicActionSheet, elephantData_URL, UIfactory, $templateCache, MyitemPageNotification, ViewsResource, DrupalHelperService, DrupalApiConstant, NodeResource, AuthenticationService) {
  /**
   * Variables and array to store and retrieve items
   */
  $scope.items = [];
  $scope.state = ITEM_STATES;
  var itemOptions = {
    view_name: 'myitem',
    page: 0,
    pagesize: 5,
    format_output: 0,
    field_user_mail_value: $localStorage.email
  };

  $scope.loadItems = function () {
    ViewsResource.retrieve(itemOptions)
      .then(function (res) {
        handleItemFeed(res.data)
      }, function (err) {
        //TODO: handle my items fetch error
      })
  };

  /**
   * Initial loadMore() call handler.
   */
  var handleItemFeed = function(data) {
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

  //Function checks status of the item
  $scope.checkStatus = function(item){
    if(item.field_publishing_state.und[0].tid == ITEM_STATES.IN_REVIEW){
      $scope.onPending(item);
    }else if(item.field_publishing_state.und[0].tid == ITEM_STATES.APPROVED){
      $scope.onApproved(item);
    }else if(item.field_publishing_state.und[0].tid == ITEM_STATES.DECLINED){
			$scope.onDeclined(item);
    }else{
      $scope.onDeclined(item);
    }
  };

  //If item is in pending status
  $scope.onPending = function(item){
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        {text: 'Delete'}
      ],
      buttonClicked: function(index){
        if (index == 0) {
          $scope.deleteItem(item);
          hideSheet();
        }
      }
    });
    $timeout(function() {
      hideSheet();
    }, 60000);
  };
  //If item is in approved state
  $scope.onApproved = function(item){
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        {text: 'Given away'},
        {text: 'Delete'}
      ],
      buttonClicked: function(index) {
        if(index == 0){
          $scope.givenAway(item);
          hideSheet();
        }else if (index == 1) {
          $scope.deleteItem(item);
          hideSheet();
        }
      }
    });
    $timeout(function() {
      hideSheet();
    }, 60000);
  };
  //If item is in declined status
  $scope.onDeclined = function(item){
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        {text: 'Delete'}
      ],
      buttonClicked: function(index) {
        if (index == 0) {
          $scope.deleteItem(item);
          hideSheet();
        }
      }
    });
    $timeout(function() {
      hideSheet();
    }, 60000);
  };

  $scope.onGivenAway = function(item){
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        {text: 'Re-post'},
        {text: 'Delete'}
      ],
      buttonClicked: function(index){
        if(index == 0){
          $scope.reApprove(item);
          hideSheet();
        }else if(index == 1){
          $scope.deleteItem(item);
          hideSheet();
        }
      }
    });
    $timeout(function() {
      hideSheet();
    }, 60000);
  };

  // //Function which removes item
  $scope.deleteItem = function(item){
    var data = {nid: item.nid, field_publishing_state: {und: {tid: ITEM_STATES.DELETED}}};
    AuthenticationService.refreshConnection()
      .then(function (res) {
        NodeResource.update(data)
        .then(function (res) {
          var index = $scope.items.indexOf(item);
          $scope.items.splice(index, 1);
        }, function (err) {
          UIfactory.showAlert('Success', 'Item have been deleted');
        });
      });
  };


  $scope.givenAway = function(item){
		var data = {nid: item.nid, field_publishing_state: {und: {tid: ITEM_STATES.DONATED}}};
		AuthenticationService.refreshConnection()
			.then(function (res) {
				NodeResource.update(data)
					.then(function (res) {
						var index = $scope.items.indexOf(item);
						$scope.items.splice(index, 1);
					}, function (err) {
						UIfactory.showAlert('Success', 'Item have been deleted');
					});
			});
  };

  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.items = [];
    $scope.loadItems();
  });

});
