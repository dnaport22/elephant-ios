Menu.controller('MenuController', function($scope, $location, $localStorage, DrupalApiConstant, $state, AuthenticationService, $ionicSideMenuDelegate, UIfactory, $ionicPush, CurrentUserfactory) {
  $ionicPush.register().then(function(t) {
    return $ionicPush.saveToken(t);
  }).then(function(t) {
    // Do Something
    //console.log('Token saved:', t.token);
  });

  $scope.$on('cloud:push:notification', function(event, data) {
    // Do Something
  });
  $scope.state = CurrentUserfactory.initStorage();
  //$scope.userdata = CurrentUserfactory.getCurrentUserObject();

  $scope.drawerLinks_loggedOut = [
    {title: 'Home', class: 'icon ion-home', href: '#/app/main', id: 0},
    {title: 'About us', class: 'icon ion-information-circled', href: '#/app/about', id: 0},
    {title: 'Terms and conditions', class: 'icon ion-document-text', href: '#/app/tc', id: 0},
    {title: 'User guide', class: 'icon ion-ios-book', href: '#/app/userguide', id: 0}
  ];

  $scope.drawerLinks_loggedIn = [
    {title: 'Home', class: 'icon ion-home', href: '#/app/main', id: 1},
    {title: 'Post items', class: 'icon ion-upload', href: '#/app/post-item', id: 1},
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
      });
    console.log(CurrentUserfactory.initStorage())
  };

  $scope.login = function () {
    $location.path("/app/login/main");
  }
  
});