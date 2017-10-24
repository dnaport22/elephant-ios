var HomePage = angular.module('HomePage', [])
	.config(function($stateProvider, $sceDelegateProvider) {
		const TEMPLATE_DIR = 'js/Components/';
		$sceDelegateProvider.resourceUrlWhitelist([
			'self', 'http://developv2.myelephant.xyz/**'
		])
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