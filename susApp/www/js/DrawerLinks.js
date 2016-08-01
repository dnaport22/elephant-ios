angular.module('DrawerLinks', [])

.controller('DrawerController', function($scope, $location) {

  $scope.username = '';
  $scope.auth = [];
  $scope.authStatus = null;
  $scope.links = [];
  $scope.changecolor = 'positive';

  if (localStorage.getItem('user_status') == 1) {
    $scope.auth.push({title: 'Logout', status: 1});
    $scope.username = 'Logged in as ' + localStorage.getItem('user_username');
    $scope.links.push(
      {title: 'Home', class: 'icon ion-home', href: '#/app/main'},
      {title: 'My items', class: 'icon ion-folder', href: '#/app/myitems'},
      {title: 'About us', class: 'icon ion-information-circled', href: '#/app/aboutus'},
      {title: 'Terms and conditions', class: 'icon ion-document-text', href: '#/app/terms'},
      {title: 'Login temp*', class: 'icon ion-document-text', href: '#/app/login'}
    );
  }
  else {
    $scope.authStatus = 0;
    $scope.auth.push({title: 'Login', status: 0});
    $scope.links.push({title: 'About us'})
  }

  $scope.authAction = function(action) {
    if (action == 'Login') {
      $location.path('#/app/login')
    }
    else if (action == 'Logout') {
      localStorage.clear()
    }
  }
});
