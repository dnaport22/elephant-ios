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
  model: null,
  field_category:[
    {name:"Books", id: 6},
    {name:"Stationary", id:7},
    {name:"Home & Garden", id:8},
    {name:"Fashion & Beauty", id:9},
    {name:"Electronics", id:10},
    {name:"Sport & Leisure", id:11},
    {name:"Skills", id:12},
  ]
})
