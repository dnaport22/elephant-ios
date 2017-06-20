var Feed = angular.module('Feed', [])
.config(function($stateProvider, $urlRouterProvider) {
  const TEMPLATE_DIR = 'js/Components/';
  $stateProvider
  .state('app.main', {
    url: '/main',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'Feed/src/Template/Feed.html',
        controller: 'FeedViewController'
      }
    }
  })
  .state('app.feedview', {
    url: '/feed/{feed:json}',
    params: {feed: null},
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'Feed/src/Template/FullFeed.html',
        controller: 'FullFeedViewController'
      }
    }
  })
})