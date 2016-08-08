angular.module('test', [])

.controller('testCtrl', function($scope, $localStorage) {
  $scope.test = 'im here';
  $scope.$storage = $localStorage.$default({
    id: 1,
    text: 'alpha'
  });

  $scope.login = function() {
    $scope.modal.show();
  };


  $scope.data_a = [
    {title: 'alpha', id: 1},
    {title: 'alpha', id: 1},
    {title: 'alpha', id: 1},
    {title: 'beta', id: 2},
    {title: 'beta', id: 2},
    {title: 'beta', id: 2}
  ];

  $scope.data_b = [
    {title: 'beta1', id: 2},
    {title: 'beta2', id: 2},
    {title: 'beta3', id: 2}
  ];


  $scope.data = [

  ];

});
