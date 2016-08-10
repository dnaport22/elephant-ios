angular.module('test', [])

.controller('testCtrl', function($scope, $localStorage, $cordovaNetwork) {
    var type = $cordovaNetwork.getNetwork()
    var isOnline = $cordovaNetwork.isOnline()
    var isOffline = $cordovaNetwork.isOffline()
    console.log(isOnline)
});
