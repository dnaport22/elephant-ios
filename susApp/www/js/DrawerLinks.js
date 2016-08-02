angular.module('DrawerLinks', [])

.controller('DrawerController', function($state, $scope, $location) {

  $scope.username = 'Login to view more options';
  $scope.authTitle = [];
  $scope.authStatus = null;
  $scope.links = [];
  $scope.changecolor = 'positive';

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
      $location.path('/app/login')
    }
    else if (action == 'Logout') {
      localStorage.clear()
      $state.transitionTo($state.current, { reload: true, inherit: false, notify: true });
    }
  }
});
