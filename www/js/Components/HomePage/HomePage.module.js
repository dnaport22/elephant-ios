var HomePage = angular.module('HomePage', [])
	.config(function($stateProvider, $urlRouterProvider) {
		const TEMPLATE_DIR = 'js/Components/';
		$stateProvider
			.state('app.main', {
				url: '/main',
				views: {
					'menuContent': {
						templateUrl: TEMPLATE_DIR + 'HomePage/src/Template/HomePage.html',
						controller: 'HomePageController'
					}
				}
			})
	})
	.filter('clean', function() {
		return function(input) {
			// do some bounds checking here to ensure it has that index
			return input.replace(/&amp;/g, '&');
		}
	});