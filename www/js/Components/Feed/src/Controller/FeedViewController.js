elephant.controller('FeedViewController', function($window, $ionicSlideBoxDelegate, DrupalApiConstant, DrupalHelperService, ViewsResource, $state, $ionicHistory, $scope, $http, $ionicPlatform,$location, $timeout, $localStorage, UIfactory, elephantData_URL, $ionicAnalytics, $templateCache, $ionicScrollDelegate, $rootScope, CurrentUserfactory, AuthenticationService) {
  UIfactory.showSpinner();
	$rootScope.slideHeader = false;
  $rootScope.pixelLimit = 0;
  $scope.state = CurrentUserfactory.initStorage;
  var slideShowItems = [];
  $scope.showSlides = false;
  $scope.slideShow = false;
  $scope.searchItemsFinished = false;
	setTimeout(function(){
		$ionicSlideBoxDelegate.update();
	},1000);
	$scope.searchActive = false;
  /**
   * Loading spinner
   */

  //pagination options
  var paginationOptions = {};
  paginationOptions.pageFirst = 0;
  paginationOptions.pageLast = 0;
  paginationOptions.maxPage = undefined;
  $scope.slideLimit = 3;

  var searchPaginationOptions = {};
	searchPaginationOptions.pageFirst = 0;
	searchPaginationOptions.pageLast = 0;
	searchPaginationOptions.maxPage = undefined;

  var viewOptions = {
    view_name: 'item_feed',
    page: 0,
    pagesize: 10,
    format_output: '0'
  };

  var searchViewOptions = {
		view_name: 'item_feed',
		page: 0,
		pagesize: 10,
		format_output: '0'
  };

  var slideViewOptions = {
    view_name: 'in_app_slideshow',
    page: 0
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
  var searchFeed = [];
  $scope.NewFeeds = [];
  $scope.searchValue = null;

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
          case 'search':
            return handleSearchLoad(response.data);
            break;
          default:
            return true;
        }
      }, function (err) {
          that.loadMore(call, options);
        });
  };
  $scope.loadMore('initial', viewOptions);

  $scope.loadSlideShow = function () {
    UIfactory.showSpinner();
    ViewsResource.retrieve(slideViewOptions)
      .then(function (response) {
        if (response.data.length === 0) {
          $scope.showSlides = false;
          $scope.slideShow = false;
        } else {
          $scope.showSlides = true;
          $scope.slideShow = true;
					handleSlideShowData(response.data);
        }
			})
	};
  $scope.loadSlideShow();

  var handleSlideShowData = function (data) {
		for (var i = 0; i < data.length; i++) {
			slideShowItems = slideShowItems.concat(prepareSlides(data[i]));
		}
		$scope.slideShowItems = slideShowItems;
		UIfactory.hideSpinner();
	};

  var prepareSlides = function (data) {
		if("field_image" in data && "und" in data.field_image) {
			angular.forEach(data.field_image.und, function (value, key) {
				var imgPath = data.field_image.und[key].uri.split('//')[1].replace(/^\/+/, "");
				data.field_image.und[key].imgPath = DrupalHelperService.getPathToImgByStyle(DrupalApiConstant.imageStyles.large) + imgPath;
			});

		}
		return data;
	};

  $scope.onSlideClick = function (url) {
		window.open(url, '_system', 'location=no,clearsessioncache=no,clearcache=no');
	};

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
   * Description: search() function is called on ng-change in search input field,
   * it calls the loadMore() function and display clear button in the input field.
   */
  $scope.inputVal = false;
  $scope.search = function(filter) {
		if ($scope.slideShow) {
			$scope.showSlides = false;
		}
		$scope.searchActive = true;
		document.getElementById('search').style.color = "white";
		searchPaginationOptions.pageLast = undefined;
    $scope.inputVal = true;
    if (filter.length > 2) {
			UIfactory.showSpinner();
			searchFeed = [];
			searchViewOptions.combine = filter;
			$scope.loadMore('search', searchViewOptions);
    }
  };

  var handleSearchLoad = function (data) {
		if (data.length === 0) {
			$scope.searchItemsFinished = true;
		} else {
			for (var i = 0; i < data.length; i++) {
				searchFeed = searchFeed.concat(prepareFeed(data[i]));
			}
			$scope.DOMFeeds = searchFeed;
		}
		$scope.$broadcast('scroll.infiniteScrollComplete');
		UIfactory.hideSpinner();
  };

  /**
   * Description: clears input field and hide clear button.
   */
  $scope.clearInput = function() {
    if ($scope.slideShow) {
			$scope.showSlides = true;
    }
    document.getElementById('search').style.color = "transparent";
    inputVal.setValue('search', '');
    $scope.inputVal = false;
    searchViewOptions.page = 0;
    searchPaginationOptions.pageLast = undefined;
    $scope.searchActive = false;
    $scope.searchItemsFinished = false;
    $scope.DOMFeeds = initialFeed;
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
   * Description: check() function is called by infinite scroll to check if there
   * are items in the $scope.items array.
   */
  $scope.checkInitial = function() {
    return true;
  };

	/**
	 * Description: check() function is called by infinite scroll to check if there
	 * are items in the $scope.items array.
	 */
	$scope.checkSearch = function() {
		return true;
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

  /**
   * This loads the items before user enters the page.
   */
  if(!$localStorage.app_launch_activity) {
    $scope.$on('$ionicView.beforeEnter', function() {
      $scope.loadMore('initial');
    });
  }

  $scope.reloadData = function() {
    $state.go($state.current, {reload: true, inherit: false})
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.fullView = function (feed_data) {
    $state.go('app.feedview', {feed: feed_data});
  };

  /**
   * This is redirect the user to app.userguide state,
   * if the user has open the app for first time.
   */
  if(!$localStorage.app_launch_activity) {
    UIfactory.showSpinner();
    $state.go('app.userguide');
  }


});

