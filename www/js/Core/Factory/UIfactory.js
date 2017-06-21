elephant.factory('UIfactory', function($http, $ionicPopup, $ionicLoading, $q, $ionicActionSheet) {
  return {
    showAlert: function(title, template) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: template,
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      return alertPopup;
    },
    showSpinner: function() {
      var ionicSpinner = $ionicLoading.show({
        template: '<ion-spinner icon="spiral" class="spinner-dark"></ion-spinner>',
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      return ionicSpinner;
    },
    hideSpinner: function() {
      return $ionicLoading.hide();
    },
    askToUploadData: function (count) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Report upload request',
        template: 'You have ' + count  + ' reports waiting to be uploaded, Do you want to upload pending reports?'
      });

      return confirmPopup;
    },
    showInternetLabel: function() {
      var connectionLabel = $ionicActionSheet.show({
        destructiveText: 'No internet connection'
      });
      return connectionLabel;
    }
  }
});
