var PasswordReset = angular.module('PasswordReset', ['d7-services'])

.config(function($stateProvider, $urlRouterProvider) {
  const TEMPLATE_DIR = 'js/Components/';
  $stateProvider
  .state('app.reset-password', {
    url: '/reset-password',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'PasswordReset/src/Template/requestResetPassword.html',
        controller: 'RequestResetPasswordController'
      }
    }
  })

  .state('app.change-password', {
    url: '/change-password',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'PasswordReset/src/Template/changePassword.html',
        controller: 'ChangePasswordController'
      }
    }
  })

});
