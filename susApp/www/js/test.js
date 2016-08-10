angular.module('test', [])

.controller('testCtrl', function($scope, $localStorage, popAlert) {
  popAlert.showAlert('Alert', 'This is a test')
});
