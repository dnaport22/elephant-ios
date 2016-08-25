var elephant = angular.module('elephant',
[
  'ionic',
  'ngCordova',
  'ngStorage',
  'testctrls'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.views.transition('android');
  $ionicConfigProvider.scrolling.jsScrolling(false);
  $ionicConfigProvider.spinner.icon('android');

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'DrawerController'
  })

    .state('app.menu', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'DrawerController'
  })

  .state('app.main', {
    cache: false,
    url: '/main/admin',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      }
    }
  })

  .state('app.home', {
    cache: false,
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html',
        controller: 'MainpageCtrl'
      }
    }
  })


  .state('app.getitem', {
    url: '/getitem/:itemName/:itemDesc/:itemDate/:itemUid/:itemImg/:itemId/:itemStatus',
    views: {
      'menuContent': {
        templateUrl: 'templates/getitem.html',
        controller: 'ViewController'
      }
    }
  })

  .state('app.resetpassword', {
    url: '/resetpassword/:key',
    views: {
      'menuContent': {
        templateUrl: 'templates/resetpassword.html',
        controller: 'ResetPassController'
      }
    }
  })

  .state('app.requestreset', {
    url: '/requestreset',
    views: {
      'menuContent': {
        templateUrl: 'templates/requestreset.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
