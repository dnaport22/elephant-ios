angular.module('testctrls', [])

.controller('testCtrl', function(UIfactory, $timeout) {

    $timeout(function() {
      UIfactory.showSpinner();
      UIfactory.hideSpinner();
    }, 1000)


})
