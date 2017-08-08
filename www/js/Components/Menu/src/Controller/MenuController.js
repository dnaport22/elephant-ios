Menu.controller('MenuController', function($scope, $location, $localStorage, DrupalApiConstant, $state, AuthenticationService, $ionicSideMenuDelegate, UIfactory, $ionicPush, CurrentUserfactory, $ionicHistory, $firebaseAuth) {
  $ionicPush.register().then(function(t) {
    return $ionicPush.saveToken(t);
  }).then(function(t) {
    // Do Something
    //console.log('Token saved:', t.token);
  });

  $scope.$on('cloud:push:notification', function(event, data) {
    // Do Something
  });
  $scope.$state = CurrentUserfactory.initStorage;

  $scope.drawerLinks_loggedOut = [
    {title: 'Home', class: 'icon ion-home', href: '#/app/main', id: 0},
    {title: 'About us', class: 'icon ion-information-circled', href: '#/app/about', id: 0},
    {title: 'Terms and conditions', class: 'icon ion-document-text', href: '#/app/tc', id: 0},
    {title: 'User guide', class: 'icon ion-ios-book', href: '#/app/userguide', id: 0}
  ];

  $scope.drawerLinks_loggedIn = [
    {title: 'Home', class: 'icon ion-home', href: '#/app/main', id: 1},
    {title: 'Post items', class: 'icon ion-upload', href: '#/app/post-item', id: 1},
    {title: 'My items', class: 'icon ion-folder', href: '#/app/myitem', id: 1},
    {title: 'About us', class: 'icon ion-information-circled', href: '#/app/about', id: 1},
    {title: 'Terms and conditions', class: 'icon ion-document-text', href: '#/app/tc', id: 1},
    {title: 'User guide', class: 'icon ion-ios-book', href: '#/app/userguide', id: 0},
    {title: 'Recycling guide', class: 'icon ion-trash-a', href: '#/app/recyclingguide', id:1}
  ];

  $scope.logoutUser = function () {
    UIfactory.showSpinner();
    executeLogout();
  };

  var executeLogout = function () {
    var auth = $firebaseAuth();
    auth.$signOut();
    UIfactory.hideSpinner();
    CurrentUserfactory.setAnonymous();
    $ionicHistory.nextViewOptions({disableBack: true});
    $state.go('app.main');
  };

  $scope.login = function () {
    $location.path("/app/login/main");
  }
  
});