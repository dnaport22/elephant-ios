HomePage.controller('HomePageController', function ($window, $ionicSlideBoxDelegate, DrupalApiConstant, DrupalHelperService, ViewsResource, $state, $ionicHistory, $scope, $http, $ionicPlatform,$location, $timeout, $localStorage, UIfactory, CurrentUserfactory) {
	setTimeout(function(){
		$ionicSlideBoxDelegate.update();
	},1000);
	UIfactory.showSpinner();
	$scope.state = CurrentUserfactory.initStorage;

	$scope.categories = [];
	var dataset = {};
	$scope.showSlides = false;
	$scope.slideShow = false;
	var slideShowItems = [];
	setTimeout(function(){
		$ionicSlideBoxDelegate.update();
	},1000);

	var categoryViewOptions = {
		view_name: 'categories',
		page: 0,
		format_output: '0'
	};

	var slideViewOptions = {
		view_name: 'in_app_slideshow',
		page: 0
	};

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
	 * Description: loadMore() function is used to retrieve items from the server.
	 * Params: offset => last position of the items fetched,
	 *         limit => number of items to be fetched (default = 10),
	 *         filter => serach input
	 * @return items from the server $scope.items[]
	 *
	 */
	var loadCategories = function(options) {
		ViewsResource.retrieve(options)
			.then(function (response) {
				handleCategories(response.data)
			}, function (err) {
				loadCategories(options);
			});
	};
	loadCategories(categoryViewOptions);

	var handleCategories = function (data) {
		var cats = [];
		for(var i = 0; i < data.length; i++){
			dataset[data[i]["category"]] = []
		}
		for(var i = 0; i < data.length; i++){
			if (hasCategory(data[i]["category"])) {
				dataset[data[i]["category"]].push({
					"title": data[i]["title"],
					"field_item_image": {und:[{imgPath: data[i]["image"]}]},
					"created": data[i]["created"],
					"body": {und:[{value: data[i]["body"]}]},
					"field_user_mail": {und:[{value: data[i]["mail"]}]},
					"tid": data[i]["tid"]
				})
			}
		};
		$scope.categories = dataset;
		UIfactory.hideSpinner()
	};

	var hasCategory = function(newCat) {
		for (var cat in dataset) {
			return cat = newCat;
		}
	}

	$scope.fullView = function (feed_data) {
		$state.go('app.feedview', {feed: feed_data});
	};

	$scope.goToFullPage = function (category) {
		$state.go('app.fullfeed', {cat: category});
	};

	$scope.goToSearchPage = function () {
		$state.go('app.search', {type: 'all'});
	};

	/**
	 * This is redirect the user to app.userguide state,
	 * if the user has open the app for first time.
	 */
	if(!$localStorage.app_launch_activity) {
		UIfactory.showSpinner();
		$state.go('app.userguide');
	};

	/**
	 * This loads the items before user enters the page.
	 */
	if(!$localStorage.app_launch_activity) {
		$scope.$on('$ionicView.beforeEnter', function() {
			$scope.loadMore('initial');
		});
	}


});