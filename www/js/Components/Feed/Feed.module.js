var Feed = angular.module('Feed', [])
.config(function($stateProvider, $urlRouterProvider) {
  const TEMPLATE_DIR = 'js/Components/';
  $stateProvider
  .state('app.fullfeed', {
    url: '/fullfeed/',
    params: {
      cat: null
    },
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
  .filter('split', function() {
    return function(input, splitChar, splitIndex) {
      // do some bounds checking here to ensure it has that index
      return input.split(splitChar)[splitIndex];
    }
  });