var Login = angular.module('Login', ['d7-services'])
.config(function($stateProvider, $urlRouterProvider) {
  const TEMPLATE_DIR = 'js/Components/';
  $stateProvider
  .state('app.login', {
    url: '/login/:path',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'Login/src/Template/login.html',
        controller: 'LoginViewController'
      }
    }
  })
})
