var Search = angular.module('Search', ['d7-services'])
	.config(function($stateProvider, $urlRouterProvider) {
		const TEMPLATE_DIR = 'js/Components/';
		$stateProvider
			.state('app.search', {
				url: '/search',
				params: {
					type: null
				},
				views: {
					'menuContent': {
						templateUrl: TEMPLATE_DIR + 'Search/src/Template/search.html',
						controller: 'SearchViewController'
					}
				}
			})
	})