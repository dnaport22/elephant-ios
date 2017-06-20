var Legal = angular.module('Legal', ['d7-services'])
.config(function($stateProvider, $urlRouterProvider) {
  const TEMPLATE_DIR = 'js/Components/';
  $stateProvider
  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'Legal/src/Template/about.html',
        controller: 'AboutController'
      }
    }
  })

  .state('app.tc', {
    url: '/tc',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'Legal/src/Template/termsAndConditions.html',
        controller: 'TermsAndConditionsController'
      }
    }
  })

  .state('app.eula', {
    url: '/eula',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'Legal/src/Template/eula.html',
        controller: 'EulaController'
      }
    }
  })

  .state('app.pp', {
    url: '/pp',
    views: {
      'menuContent': {
        templateUrl: TEMPLATE_DIR + 'Legal/src/Template/privacyPolicy.html',
        controller: 'PrivacyPolicyController'
      }
    }
  })
});