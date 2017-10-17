var HomePage = angular.module('HomePage', [])
	.config(function($stateProvider, $urlRouterProvider) {
		const TEMPLATE_DIR = 'js/Components/';
		$stateProvider
			.state('app.homepage', {
				url: '/homepage',
				views: {
					'menuContent': {
						templateUrl: TEMPLATE_DIR + 'HomePage/src/Template/HomePage.html',
						controller: 'HomePageController'
					}
				}
			})
	})