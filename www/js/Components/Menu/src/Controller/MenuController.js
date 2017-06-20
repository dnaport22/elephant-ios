Menu.controller('MenuController', function($scope, $location, $localStorage, DrupalApiConstant, $state, AuthenticationService, $ionicSideMenuDelegate, UIfactory, $ionicPush) {
  $ionicPush.register().then(function(t) {
    return $ionicPush.saveToken(t);
  }).then(function(t) {
    // Do Something
    //console.log('Token saved:', t.token);
  });

  $scope.$on('cloud:push:notification', function(event, data) {
    // Do Something
  });

  $scope.username = $localStorage.user_username;
  $scope.$storage = $localStorage.$default({
    user_login_id: 0,
    user_username: null,
    user_activation: null,
    user_email: null,
    expiry: 0,
    app_launch_activity: 0
  });

  $scope.drawerLinks_loggedOut = [
    {title: 'Home', class: 'icon ion-home', href: '#/app/main', id: 0},
    {title: 'About us', class: 'icon ion-information-circled', href: '#/app/about', id: 0},
    {title: 'Terms and conditions', class: 'icon ion-document-text', href: '#/app/tc', id: 0},
    {title: 'User guide', class: 'icon ion-ios-book', href: '#/app/userguide', id: 0}
  ];

  $scope.drawerLinks_loggedIn = [
    {title: 'Home', class: 'icon ion-home', href: '#/app/main', id: 1},
    {title: 'Post items', class: 'icon ion-upload', href: '#/app/postitem', id: 1},
    {title: 'My items', class: 'icon ion-folder', href: '#/app/myitems', id: 1},
    {title: 'About us', class: 'icon ion-information-circled', href: '#/app/about', id: 1},
    {title: 'Terms and conditions', class: 'icon ion-document-text', href: '#/app/tc', id: 1},
    {title: 'User guide', class: 'icon ion-ios-book', href: '#/app/userguide', id: 0},
    {title: 'Recycling guide', class: 'icon ion-trash-a', href: '#/app/recyclingguide', id:1}
  ];

  $scope.logoutUser = function () {
    UIfactory.showSpinner();
    AuthenticationService.refreshConnection()
      .then(function (res) {
        executeLogout()
      });
  };

  var executeLogout = function () {
    AuthenticationService.logout()
      .then(function (res) {
        UIfactory.hideSpinner();
        CurrentUserfactory.setStatusAnonymous();
        $state.go('app.login');
      });
  };

  $scope.goToPP = function() {
    $state.go('app.pp')
  };
  $scope.goToEULA = function() {
    $state.go('app.eula')
  };
  
});