elephant.controller('FeedViewController', function(DrupalApiConstant, DrupalHelperService, ViewsResource, $state, $ionicHistory, $scope, $http, $ionicPlatform,$location, $timeout, $localStorage, UIfactory, elephantData_URL, $ionicAnalytics, $templateCache, $ionicScrollDelegate, $rootScope, CurrentUserfactory, AuthenticationService) {
  $rootScope.slideHeader = false;
  $rootScope.pixelLimit = 0;
  $scope.state = CurrentUserfactory.initStorage;

  /**
   * Loading spinner
   */
  //UIfactory.showSpinner();

  //pagination options
  var paginationOptions = {};
  paginationOptions.pageFirst = 0;
  paginationOptions.pageLast = undefined;
  paginationOptions.maxPage = undefined;

  var viewOptions = {
    view_name: 'item_feed',
    page: 0,
    pagesize: 5,
    format_output: '0'
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
  $scope.NewFeeds = [];
  var preservedFeed = DOMFeeds;
  var searchFeeds = [];
  var retrieved = 0;
  $scope.searchValue = null;

  /**
   * Description: loadMore() function is used to retrieve items from the server.
   * Params: offset => last position of the items fetched,
   *         limit => number of items to be fetched (default = 10),
   *         filter => serach input
   * @return items from the server $scope.items[]
   */
  $scope.loadMore = function(callback) {
    ViewsResource.retrieve(viewOptions)
      .then(function (response) {
        UIfactory.hideSpinner();
        // Navigate to call specific handler
        switch (callback) {
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
          console.log(err)
        });
  };

  /**
   * Called on infinte scroll
   */
  $scope.loadInfiniteScroll = function () {
    if (paginationOptions.maxPage === undefined) {
      //start initial with 0
      paginationOptions.pageLast = (paginationOptions.pageLast === undefined) ? 0 : paginationOptions.pageLast + 1,
        viewOptions.page = paginationOptions.pageLast;

    return $scope.loadMore('scroll');
    }

  };


  /**
   * Initial loadMore() call handler.
   */
  var handleInitialLoad = function(data) {
    for (var i = 0; i < data.length; i++) {
      DOMFeeds = DOMFeeds.concat(prepareFeed(data[i]));
    }
    $scope.DOMFeeds = DOMFeeds;
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

  /**
   * Executing pull to refresh.
   */
  $scope.pullToRefresh = function() {
    viewOptions.page = 0;
    $scope.loadMore('refresh');
  };


  /**
   * Description: search() function is called on ng-change in search input field,
   * it calls the loadMore() function and display clear button in the input field.
   */
  $scope.inputVal = false;
  $scope.search = function(filter) {
    $scope.inputVal = true;
    $scope.DOMFeeds = [];
    viewOptions.title = filter;
    $scope.loadMore('search');
  };

  var handleSearchLoad = function (data) {
    pollingFeeds(data);
  };

  /**
   * Description: clears input field and hide clear button.
   */
  $scope.clearInput = function() {
    inputVal.setValue('search', '');
    $scope.inputVal = false;
    $scope.DOMFeeds = DOMFeeds;
  };

  /**
   * Description: check() function is called by infinite scroll to check if there
   * are items in the $scope.items array.
   */
  $scope.check = function() {
    return $scope.DOMFeeds.length > 0;
  };

  /**
   * Executing loadMore() with initial state when view is loaded.
   */
  $scope.$on('$ionicView.loaded', function() {
    $scope.loadMore('initial');
  });

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
    pollingFeeds(data);
    $scope.$broadcast('scroll.infiniteScrollComplete');
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
  };
  /**
   * Description: check() function is called by infinite scroll to check if there
   * are items in the $scope.items array.
   */
  $scope.check = function() {
    return retrieved > 0
  };

  /**
   * Description: used for navigating user to getitem and login/post item page.
   */
  $scope.trafficLight = function(route, item_name, item_desc, item_date, item_uid, item_img) {
    if (route == 'getitem') {
      // if(typeof analytics !== "undefined") { analytics.trackEvent("Category", "Action", "Label", 25); }
      $location.path("/app/getitem/" + item_name + "/" + item_desc + "/" + item_date + "/" + item_uid + "/" + item_img )
    }
    else if (route == 'login') {
      $ionicHistory.nextViewOptions({disableBack: false});
      $location.path("app/login/postitem");
    }
  };

  // /**
  //  * This loads the items before user enters the page.
  //  */
  // if($localStorage.app_launch_activity == 0) {
  //   $scope.$on('$ionicView.beforeEnter', function() {
  //     $scope.loadMore();
  //   });
  // }
  // else {
  //   $scope.$on('$stateChangeSuccess', function() {
  //     $scope.loadMore();
  //   });
  // }


  $scope.reloadData = function() {
    $state.go($state.current, {reload: true, inherit: false})
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.fullView = function (feed_data) {
    $state.go('app.feedview', {feed: feed_data});
  };

  // /**
  //  * This is redirect the user to app.userguide state,
  //  * if the user has open the app for first time.
  //  */
  // if($localStorage.app_launch_activity == 0) {
  //   UIfactory.showSpinner();
  //   $state.go('app.userguide');
  // }


});

