
angular.module('susapp', ['ionic', 'Getitems', 'susapp.config', 'Viewitem', 'Myitems'])


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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
  })

  .state('app.main', {
    url: '/main',
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html',
        controller: 'MainpageCtrl'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html'
      }
    }
  })

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html'
      }
    }
  })

  .state('app.getitem', {
    url: '/getitem:itemId',
    views: {
      'menuContent': {
        templateUrl: 'templates/getitem.html'
      }
    }
  })

  .state('app.resetpassword', {
    url: '/resetpassword',
    views: {
      'menuContent': {
        templateUrl: 'templates/resetpassword.html'
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
  })

  .state('app.myitems', {
    url: '/myitems',
    views: {
      'menuContent': {
        templateUrl: 'templates/myitems.html',
        controller: 'MyitemsController'
      }
    }
  })

  .state('app.postitem', {
    url: '/postitem',
    views: {
      'menuContent': {
        templateUrl: 'templates/postitem.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
