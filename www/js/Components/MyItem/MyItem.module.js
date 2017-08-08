var MyItem = angular.module('MyItem', ['d7-services'])
.config(function($stateProvider, $urlRouterProvider) {
  const TEMPLATE_DIR = 'js/Components/';
  $stateProvider
  .state('app.myitem', {
    url: '/myitem',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'MyItem/src/Template/MyItem.html',
        controller: 'MyItemViewController'
      }
    }
  })

})
.constant('ITEM_STATES', {
  APPROVED: "1",
  IN_REVIEW: "2",
  DONATED: "3",
  DELETED: "4",
  DECLINED: "5"
});

