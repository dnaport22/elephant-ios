Search.controller('SearchViewController', function ($state, $scope, $stateParams, UIfactory, ViewsResource, DrupalHelperService, DrupalApiConstant, $ionicNavBarDelegate, $ionicHistory) {
	$scope.type = $stateParams.type;
	$scope.DOMFeeds = [];
	var searchFeed = [];

	$scope.back = function () {
		$ionicHistory.goBack();
		$ionicHistory.clearCache();
	};

	var searchViewOptions = {
		view_name: 'item_feed',
		page: 0,
		pagesize: 10,
		format_output: '0'
	};

	var searchPaginationOptions = {};
	searchPaginationOptions.pageFirst = 0;
	searchPaginationOptions.pageLast = 0;
	searchPaginationOptions.maxPage = undefined;

	/**
	 * Description: loadMore() function is used to retrieve items from the server.
	 * Params: offset => last position of the items fetched,
	 *         limit => number of items to be fetched (default = 10),
	 *         filter => serach input
	 * @return items from the server $scope.items[]
	 */
	$scope.loadMore = function(options) {
		var that = $scope;
		ViewsResource.retrieve(options)
			.then(function (response) {
				return handleSearchLoad(response.data);
			}, function (err) {
				that.loadMore(options);
			});
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

	var searchPageInfinite = function () {
		if (searchPaginationOptions.maxPage === undefined) {
			//start initial with 0
			searchPaginationOptions.pageLast = (searchPaginationOptions.pageLast === undefined) ? 0 : searchPaginationOptions.pageLast + 1,
				searchViewOptions.page = searchPaginationOptions.pageLast;
			$scope.loadMore(searchViewOptions);
		}
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
		searchPaginationOptions.pageLast = undefined;
		$scope.inputVal = true;

		if (filter.length > 2) {
			UIfactory.showSpinner();
			searchFeed = [];
			searchViewOptions.keys = filter;
			if ($scope.type !== 'all') {
				searchViewOptions.tid_1 = $scope.type.replace(/&amp;/g,'%26')
			}
			$scope.loadMore(searchViewOptions);
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
		inputVal.setValue('search', '');
		searchViewOptions.page = 0;
		searchPaginationOptions.pageLast = undefined;
		$scope.searchActive = false;
		$scope.searchItemsFinished = false;
		$scope.DOMFeeds = [];
	};

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
	 * Description: check() function is called by infinite scroll to check if there
	 * are items in the $scope.items array.
	 */
	$scope.checkSearch = function() {
		return true;
	};

	$scope.fullView = function (feed_data) {
		$state.go('app.feedview', {feed: feed_data});
	};
	
})