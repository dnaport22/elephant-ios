var elephant = angular.module('elephant',
[
  'ionic',
  'ionic.cloud',
  'ngCordova',
  'ngStorage',
  'ngCookies',
  'ionic.service.core',
  'ionic.service.analytics',
  'firebase',
  'Login',
  'Register',
  'PasswordReset',
  'Menu',
  'Legal',
  'Feed',
  'PostItem',
  'MyItem'
])

.config(function ($ionicCloudProvider) {
  // This initialise ionic cloud provider, this should be moved into a separate directory.
  $ionicCloudProvider.init({
    "core": {
      "app_id": "e2fc4a7c"
    },
    "push": {
      "sender_id": "519341329763",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true,
          "gcmSandbox": true
        }
      }
    }
  });

})

.run(function($ionicPlatform, $ionicAnalytics, $localStorage, AuthenticationService, UIfactory) {
  $ionicPlatform.ready(function() {
		AuthenticationService.refreshConnection()
			.then(function (res) {
				AuthenticationService.login({username: 'elephant app', password: 'admin'})
					.then(function (res) {
						$localStorage.bot_status = true;
					}, function (err) {
						if (err.status = 406) {
							return null;
						}
					});
			});
    //Register ionic analytics
    //$ionicAnalytics.register();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(false);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, DrupalApiConstant, $ionicCloudProvider) {
  DrupalApiConstant.drupal_instance = "http://developv2.myelephant.xyz/";
  DrupalApiConstant.api_endpoint = "api/elev2/";
  //$ionicConfigProvider.views.transition('android');
  $ionicConfigProvider.scrolling.jsScrolling(false);
  //$ionicConfigProvider.spinner.icon('android');

  const TEMPLATE_DIR = 'js/Components/';
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: TEMPLATE_DIR + 'Menu/src/Template/menu.html',
    controller: 'MenuController'
  })

  .state('app.userguide', {
    url: '/userguide',
    views: {
      'menuContent': {
        templateUrl: 'js/Core/UserGuide/userguide.html',
        controller: 'UserguideController'
      }
    }
  })

  .state('app.recycling-guide', {
    url: '/recyclingguide',
    views: {
      'menuContent': {
        templateUrl: "js/Core/RecyclingGuide/recyclingguide.html"
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
