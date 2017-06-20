var PostReport = angular.module('PostItem', ['d7-services'])
.config(function($stateProvider, $urlRouterProvider) {
  const TEMPLATE_DIR = 'js/Components/';
  $stateProvider

  .state('app.post-item', {
    url: '/post-item',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'PostItem/src/Template/postItem.html',
        controller: 'PostItemViewController'
      }
    }
  })

});
