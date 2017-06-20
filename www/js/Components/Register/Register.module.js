var Register = angular.module('Register', ['d7-services'])
.config(function($stateProvider, $urlRouterProvider) {
  const TEMPLATE_DIR = 'js/Components/';
  $stateProvider
  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'Register/src/Template/register.html',
        controller: 'RegisterViewController'
      }
    }
  })

});