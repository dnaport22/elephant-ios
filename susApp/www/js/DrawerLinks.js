angular.module('DrawerLinks', [])

.controller('DrawerController', function($state, $scope, $location, $ionicLoading, $window, $ionicHistory, $timeout, $localStorage) {


  $scope.username = 'Login to view more options';
  $scope.authTitle = [];
  $scope.authStatus = null;
  $scope.links = [];
  $scope.changecolor = 'positive';
  $scope.$test = $localStorage.test;
  

  if ($localStorage.test == 1) {
    $scope.authTitle = 'Logout';
    $scope.authStatus = 1;
    $scope.username = 'Logged in as ' + localStorage.getItem('user_username');
    $scope.links.push(
      {title: 'Home', class: 'icon ion-home', href: '#/app/main'},
      {title: 'My items', class: 'icon ion-folder', href: '#/app/myitems'},
      {title: 'About us', class: 'icon ion-information-circled', href: '#/app/aboutus'},
      {title: 'Terms and conditions', class: 'icon ion-document-text', href: '#/app/terms'}
    );
  }
  else {
    $scope.authStatus = 0;
    $scope.authTitle = 'Login';
    $scope.links.push(
      {title: 'Home', class: 'icon ion-home', href: '#/app/main'},
      {title: 'About us', class: 'icon ion-information-circled', href: '#/app/aboutus'}
    )
  }

  $scope.authAction = function(action) {
    if (action == 'Login') {
      $location.path('/app/login/main')
    }
    else if (action == 'Logout') {
      $ionicLoading.show({
        content: 'Logging out',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

      $timeout(function () {
        $ionicLoading.hide();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        localStorage.clear();
        $window.location.reload();
        $ionicSideMenuDelegate.toggleLeft();
      }, 1000);
    }
  }
});
