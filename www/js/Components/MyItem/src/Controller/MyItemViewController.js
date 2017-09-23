MyItem.controller('MyItemViewController', function(ITEM_STATES, $scope, $http, $timeout, $localStorage, $ionicActionSheet, elephantData_URL, UIfactory, $templateCache, MyitemPageNotification, ViewsResource, DrupalHelperService, DrupalApiConstant, NodeResource, AuthenticationService) {
  /**
   * Variables and array to store and retrieve items
   */
  $scope.items = [];
  $scope.state = ITEM_STATES;
  $scope.itemsFinished = false;
  var items = [];
  var viewOptions = {
    view_name: 'myitem',
    page: 0,
    pagesize: 10,
    format_output: 0,
    field_user_mail_value: $localStorage.email
  };

	//pagination options
	var paginationOptions = {};
	paginationOptions.pageFirst = 0;
	paginationOptions.pageLast = 0;
	paginationOptions.maxPage = undefined;

  $scope.loadItems = function (call) {
    ViewsResource.retrieve(viewOptions)
      .then(function (res) {
      	switch (call) {
					case 'initial':
						return handleInitialLoad(res.data);
						break;
					case 'infinite':
						return handleInfiniteLoad(res.data);
						break;
				}

      }, function (err) {
        //TODO: handle my items fetch error
      })
  };

	/**
	 * Initial loadMore() call handler.
	 */
	var handleInitialLoad = function(data) {
		for (var i = 0; i < data.length; i++) {
			items = items.concat(prepareFeed(data[i]));
		}
		$scope.items = items;
		UIfactory.hideSpinner();
	};

	/**
	 * Called on infinite scroll
	 */
	$scope.loadInfiniteScroll = function () {
		if (!$scope.itemsFinished) {
			if (paginationOptions.maxPage === undefined) {
				//start initial with 0
				paginationOptions.pageLast = (paginationOptions.pageLast === undefined) ? 0 : paginationOptions.pageLast + 1,
					viewOptions.page = paginationOptions.pageLast;
				$scope.loadItems('infinite');
			}
		}
		return false;
	};

  /**
   * Initial loadMore() call handler.
   */
  var handleInfiniteLoad = function(data) {
		if (data.length === 0) {
			$scope.itemsFinished = true;
		} else {
			for (var i = 0; i < data.length; i++) {
				items = items.concat(prepareFeed(data[i]));
			}
			$scope.items = items;
		}
		$scope.$broadcast('scroll.infiniteScrollComplete');
		UIfactory.hideSpinner();
  };

  //prepare article after fetched from server
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

	/**
	 * Polling feeds.
	 *
	 * It compare the new feeds with the ones already in viewport and add new ones (if any).
	 * If the content type is News the it passes the data to notificationRequestLoader after appending to viewport.
	 */
	var pollingFeeds = function (data) {
		for (var i = 0; i < data.length; i++) {
			var match = false;
			for (var j = 0; j < $scope.items.length; j++) {
				if ($scope.items[j]['nid'] == data[i]['nid']) {
					// Ignore if content is already in the DOM.
					match = true;
					break;
				}
			}
			if (!match) {
				// Add new content into DOM.
				$scope.NewFeeds = [];
				$scope.NewFeeds = $scope.NewFeeds.concat(prepareFeed(data[i]));
				$scope.items = $scope.NewFeeds.concat($scope.DOMFeeds);
			}
		}
		UIfactory.hideSpinner();
	};

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
          UIfactory.showAlert('Ooops!', 'Error while deleting item');
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
						UIfactory.showAlert('Ooops!', 'Error while marking item as Given Away');
					});
			});
  };

  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.items = [];
    $scope.loadItems('initial');
  });

});
