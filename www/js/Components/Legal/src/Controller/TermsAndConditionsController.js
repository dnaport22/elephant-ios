Legal.controller('TermsAndConditionsController', function($scope, NodeResource, UIfactory, $state) {
  // const TC_CONTENT_ID = 19;
  // $scope.tc_content = null;
  // UIfactory.showSpinner();
  // NodeResource.retrieve({nid: TC_CONTENT_ID})
  //   .then(function (res) {
  //     UIfactory.hideSpinner();
  //     $scope.tc_content = res.data.body['und'][0]['value'];
  //   }, function (err) {
  //     UIfactory.hideSpinner();
  //     UIfactory.showAlert('Error', 'Error while retrieving content');
  //   });

	$scope.goToPP = function() {
		$state.go('app.pp')
	};
	$scope.goToEULA = function() {
		$state.go('app.eula')
	};
});