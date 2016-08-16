elephant.controller('DrawerController', function($state, $scope, $location, $localStorage, UIfactory, $ionicPopover) {

  $scope.username = $localStorage.user_username;
  $scope.$storage = $localStorage.$default({
    user_login_id: 0,
    user_username: null,
    user_activation: null,
    user_email: null,
    expiry: 0,
    app_launch_activity: 0
  });

  $scope.drawerLinks_loggedOut = [];

  $scope.drawerLinks_loggedIn = [
    {title: 'Home', class: 'icon ion-home', href: '#/app/home', id: 1},
  ];

  $scope.logout = function() {
    UIfactory.showSpinner();
    $localStorage.user_username = null;
    $localStorage.user_email = null;
    $localStorage.user_activation = null;
    $localStorage.user_login_id = 0;
    $localStorage.expiry = 0;
    UIfactory.hideSpinner();
  }
  $scope.loginMainuser = function() {
    $location.path("/app/main/admin")
  }

//This is to check logged in time interval (this code needs to be moved to a structred area)
  function loginexpiryCheck() {
    var two_weeks = 336;
    var now = new Date().getTime();
    if(now - $localStorage.expiry > two_weeks*60*60*1000) {
      $localStorage.expiry = 0;
      $localStorage.user_login_id = 0;
      $localStorage.user_email = null;
      $localStorage.user_username = null;
      $localStorage.user_activation = null;
    }
  }
  loginexpiryCheck();

 /* This is userguide pop up modal which will be executed from the menu.html is $localStorage.app_launch_activity == 0
  * Needs improvement
  */
 $ionicPopover.fromTemplateUrl('templates/userguide.html', {
     scope: $scope,
     animation: 'slide-in-up',
   }).then(function(popover) {
     $scope.popover = popover;
   });
   $scope.Test = function() {
     if ($localStorage.user_login_id == 1) {
       return $scope.popover.show()
     }
     else {
       return true;
     }
   }
   $scope.openModal = function() {
     $scope.popover.show();
   };
   $scope.closeModal = function() {
     $scope.popover.hide();
   };
});
