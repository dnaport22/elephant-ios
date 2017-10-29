elephant.controller('FeedViewController', function($window, $ionicSlideBoxDelegate, DrupalApiConstant, DrupalHelperService, ViewsResource, $state, $ionicHistory, $scope, $http, $ionicPlatform,$location, $timeout, $localStorage, UIfactory, elephantData_URL, $ionicAnalytics, $templateCache, $ionicScrollDelegate, $rootScope, CurrentUserfactory, $stateParams) {
  UIfactory.showSpinner();
  $scope.page = $stateParams.cat;
  $rootScope.pixelLimit = 0;
  $scope.state = CurrentUserfactory.initStorage;
  /**
   * Loading spinner
   */

  //pagination options
  var paginationOptions = {};
  paginationOptions.pageFirst = 0;
  paginationOptions.pageLast = 0;
  paginationOptions.maxPage = undefined;

  var viewOptions = {
    view_name: 'item_feed',
    page: 0,
    pagesize: 10,
    format_output: '0',
		tid_1: $scope.page.replace(/&amp;/g,'%26')
  };

  /**
   * Home page view list & grid
   */
  $scope.viewType = 'list';
  $scope.changeToGrid = function(type) {
    if(type == 'list') {
      $scope.viewType = 'grid';
    }
    else if (type == 'grid') {
      $scope.viewType = 'list';
    }
  };

  /**
   * Variables and array to store and retrieve items
   */
  $scope.items = [];
  var DOMFeeds = [];
  $scope.DOMFeeds = [];
  var initialFeed = [];
  $scope.NewFeeds = [];

  /**
   * Description: loadMore() function is used to retrieve items from the server.
   * Params: offset => last position of the items fetched,
   *         limit => number of items to be fetched (default = 10),
   *         filter => serach input
   * @return items from the server $scope.items[]
   */
  $scope.loadMore = function(callback, options) {
    var that = $scope;
    var call = callback;
    ViewsResource.retrieve(options)
      .then(function (response) {
        // Navigate to call specific handler
        switch (call) {
          case 'refresh':
            return handlePullToRefresh(response.data);
            break;
          case 'scroll':
            return handleInfiniteScroll(response.data);
          case 'initial':
            return handleInitialLoad(response.data);
            break;
          default:
            return true;
        }
      }, function (err) {
          that.loadMore(call, options);
        });
  };
  $scope.loadMore('initial', viewOptions);
  /**
   * Called on infinite scroll
   */
  $scope.loadInitialInfiniteScroll = function () {
		if (!$scope.itemsFinished) {
			return initialInfinite();
		}
    return false;
  };

	/**
	 * Called on infinite scroll
	 */
	$scope.loadSearchInfiniteScroll = function () {
		if (!$scope.searchItemsFinished) {
			return searchPageInfinite();
		}
		return false;
	};

  var initialInfinite = function () {
		if (paginationOptions.maxPage === undefined) {
			//start initial with 0
			paginationOptions.pageLast = (paginationOptions.pageLast === undefined) ? 0 : paginationOptions.pageLast + 1,
				viewOptions.page = paginationOptions.pageLast;
			$scope.loadMore('scroll', viewOptions);
		}
	};

	var searchPageInfinite = function () {
		if (searchPaginationOptions.maxPage === undefined) {
			//start initial with 0
			searchPaginationOptions.pageLast = (searchPaginationOptions.pageLast === undefined) ? 0 : searchPaginationOptions.pageLast + 1,
				searchViewOptions.page = searchPaginationOptions.pageLast;
			$scope.loadMore('scroll', searchViewOptions);
		}
	};

  /**
   * Initial loadMore() call handler.
   */
  var handleInitialLoad = function(data) {
    for (var i = 0; i < data.length; i++) {
      initialFeed = initialFeed.concat(prepareFeed(data[i]));
    }
    $scope.DOMFeeds = initialFeed;
    UIfactory.hideSpinner();
  };

	Array.prototype.random = function () {
		return this[Math.floor((Math.random()*this.length))];
	};

  //prepare article after fetched from server
  function prepareFeed(data) {
    data.created = new Date(data.created*1000);
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
   * Executing pull to refresh.
   */
  $scope.pullToRefresh = function() {
    viewOptions.page = 0;
    $scope.loadMore('refresh', viewOptions);
  };

  /**
   * Executing infinite scroll.
   */
  $scope.reloadData = function() {
    $state.go($state.current, {reload: true, inherit: false});
    $scope.$broadcast('scroll.refreshComplete');
  };

  /**
   * Broadcasting infinite scroll changes.
   */
  var handleInfiniteScroll = function (data) {
    if (data.length === 0) {
    	if (!$scope.searchActive) {
				$scope.itemsFinished = true;
			}
    } else {
			for (var i = 0; i < data.length; i++) {
				initialFeed = initialFeed.concat(prepareFeed(data[i]));
			}
			$scope.DOMFeeds = initialFeed;

    }

		$scope.$broadcast('scroll.infiniteScrollComplete');
    UIfactory.hideSpinner();
  };


  /**
   * Broadcasting pull to refresh changes.
   */
  var handlePullToRefresh = function (data) {
    pollingFeeds(data);
    $scope.$broadcast('scroll.refreshComplete');
  };

  /**
   * Polling feeds.
   *
   * It compare the new feeds with the ones already in viewport and add new ones (if any).
   * If the content type is News the it passes the data to notificationRequestLoader after appending to viewport.
   */
  var pollingFeeds = function (data) {
    for (var i = 0; i < data.length; i++) {
      var match = false;
      for (var j = 0; j < $scope.DOMFeeds.length; j++) {
        if ($scope.DOMFeeds[j]['nid'] == data[i]['nid']) {
          // Ignore if content is already in the DOM.
          match = true;
          break;
        }
      }
      if (!match) {
        // Add new content into DOM.
        $scope.NewFeeds = [];
        $scope.NewFeeds = $scope.NewFeeds.concat(prepareFeed(data[i]));
        $scope.DOMFeeds = $scope.NewFeeds.concat($scope.DOMFeeds);
      }
    }
    UIfactory.hideSpinner();
  };

  /**
   * Description: used for navigating user to getitem and login/post item page.
   */
  $scope.trafficLight = function(route, item_name, item_desc, item_date, item_uid, item_img) {
    if (route == 'getitem') {
      $location.path("/app/getitem/" + item_name + "/" + item_desc + "/" + item_date + "/" + item_uid + "/" + item_img )
    }
    else if (route == 'login') {
      $ionicHistory.nextViewOptions({disableBack: false});
      $location.path("app/login/postitem");
    }
  };

  $scope.reloadData = function() {
    $state.go($state.current, {reload: true, inherit: false})
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.fullView = function (feed_data) {
    $state.go('app.feedview', {feed: feed_data});
  };

  $scope.searchCategory = function () {
		$state.go('app.search', {type: $scope.page})
	}


});

