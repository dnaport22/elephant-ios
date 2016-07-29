angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicActionSheet) {

  $scope.show = function() {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Capture using Camera',
          buttonClicked: alert('triggered')},
        { text: 'Select from gallery' }
      ],
      destructiveText: 'Delete',
      titleText: 'How would you like to select a picture?',
      cancelText: 'Cancel',
      cancel: function() {
           // add cancel code..
         },
      buttonClicked: function(index) {
        return true;
      }
    });
  }
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('MainpageCtrl', function($scope, $http) {
  $http.get("http://maddna.xyz/getitems.php")
    .then(function(response) {
      $scope.allItems = response.data.items;
    });

 });
