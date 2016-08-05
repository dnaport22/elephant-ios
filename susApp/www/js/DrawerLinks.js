angular.module('DrawerLinks', [])

.controller('DrawerController', function($state, $scope, $location, $ionicLoading, $window, $ionicHistory, $timeout, $localStorage) {


  $scope.username = 'Login to view more options';
  $scope.authTitle = [];
  $scope.authStatus = null;
  $scope.links = [];
  $scope.changecolor = 'positive';
  $scope.$test = $localStorage.test;

  $scope.$storage = $localStorage.$default({
    user_login_id: 0
  })

  $scope.drawerLinks_top = [
    {title: 'Home', class: 'icon ion-home', href: '#/app/main', id: 1},
    {title: 'My items', class: 'icon ion-folder', href: '#/app/myitems', id: 1},
    {title: 'About us', class: 'icon ion-information-circled', href: '#/app/aboutus', id: 1},
    {title: 'Terms and conditions', class: 'icon ion-document-text', href: '#/app/terms', id: 1},
    {title: 'Home', class: 'icon ion-home', href: '#/app/main', id: 0},
    {title: 'About us', class: 'icon ion-information-circled', href: '#/app/aboutus', id: 0}
  ];

  $scope.drawerLinks_bottom = [
    {title: 'Login', href: '#/app/login', id: 0},
    {title: 'Logout', id: 1}
  ];

  if (localStorage.getItem('user_status') == 1) {
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
      localStorage.setItem('user_username', '');
      localStorage.setItem('user_email', '');
      localStorage.setItem('user_activation', '');
      $localStorage.user_login_id = 0;

    }
  }
});
