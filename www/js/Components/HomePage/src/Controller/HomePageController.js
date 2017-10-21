HomePage.controller('HomePageController', function ($window, $ionicSlideBoxDelegate, DrupalApiConstant, DrupalHelperService, ViewsResource, $state, $ionicHistory, $scope, $http, $ionicPlatform,$location, $timeout, $localStorage, UIfactory, elephantData_URL, $ionicAnalytics, $templateCache, $ionicScrollDelegate, $rootScope, CurrentUserfactory, AuthenticationService) {

	UIfactory.showSpinner();

	$scope.categories = [];
	var dataset = {};

	var categoryViewOptions = {
		view_name: 'categories',
		page: 0,
		format_output: '0'
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
		}
		console.log(dataset)
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


});