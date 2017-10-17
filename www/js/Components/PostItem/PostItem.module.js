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

})
.constant('CATEGORIES', {
  field_category:["Books, Stationary", "Home & Garden", "Fashion & Beauty", "Electronics", "Sport & Leisure", "Skills"]
})
