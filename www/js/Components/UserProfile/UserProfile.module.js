var UserProfile = angular.module('UserProfile',[])
.config(function($stateProvider, $urlRouterProvider) {
  const TEMPLATE_DIR = 'js/Components/';
  $stateProvider

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'UserProfile/src/Template/userProfile.html',
        controller: 'UserProfileController'
      }
    }
  })
});
